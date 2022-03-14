import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { Router, ActivatedRoute } from '@angular/router'
import { BusinessService } from '../../business.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/core/cep.service';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj.pipe';
import { CepResponse } from 'src/app/shared/models/cep-response';
import { IsLoadingService } from 'src/app/shared/is-loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/core/language/language.service';

@Component({
  selector: 'app-business-edit-page',
  templateUrl: './business-edit-page.component.html',
  styleUrls: ['./business-edit-page.component.scss']
})
export class BusinessEditPageComponent implements OnInit {
  business?: Business
  name?: string
  isLoading: boolean
  businessForm = this.formBuilder.group({
    address: this.formBuilder.group({
      cep: ['', Validators.required],
      street: { value: '' },
      neighborhood: [''],
      city: [''],
      state: [''],
    }),
    company: this.formBuilder.group({
      name: ['', Validators.required],
      business: ['', Validators.required],
      valuation: ['', Validators.required],
      cnpj: ['', Validators.required],
      active: ['', Validators.required],
    })
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private cnpjPipe: CnpjPipe,
    private isLoadingService: IsLoadingService,
    private toaster: MatSnackBar,
    private languageService: LanguageService
  ) {
    this.isLoading = isLoadingService.status
    this.isLoadingService.isLoading$.subscribe(status => {
      this.isLoading = status
    })
  }

  getBusiness(id: number) {
    this.businessService.getBusinessById(id).subscribe(business => {
      this.business = business
      this.cepService.find(business.cep).subscribe(this.updateAddressForm)
    })
  }

  onChangeCep() {
    this.cepService.find(this.businessForm.value.address.cep)
      .subscribe(this.updateAddressForm)
  }

  // changed to arrow function, this inside subscribe dont work even with binded this
  updateAddressForm = (response: CepResponse) => {
    if (!response || response.erro) return
    const business = this.business as Business
    this.businessForm.setValue({
      address: {
        cep: response.cep,
        street: response.logradouro,
        neighborhood: response.bairro,
        city: response.localidade,
        state: response.uf
      },
      company: {
        name: business.name,
        business: business.business,
        valuation: business.valuation,
        cnpj: this.cnpjPipe.transform(business.cnpj),
        active: business.active
      }
    })
  }

  onSubmit() {
    if (!this.businessForm.valid) return
    if (!this.business?.id) return

    const { id } = this.business
    const updateBusiness = {
      ...this.businessForm.value.company,
      cep: this.businessForm.value.address.cep
    }

    this.businessService.updateBusiness(id, updateBusiness)
      .subscribe(business => {
        this.openToaster()
      })
  }

  openToaster() {
    const message = this.languageService.getNow('edit.update')

    this.toaster.open(message, '', {
      verticalPosition: 'top', duration: 3000
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getBusiness(Number(params['id']))
    }
    )
  }

}
