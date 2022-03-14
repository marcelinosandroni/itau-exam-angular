import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { Address } from 'src/app/shared/models/address';
import { Company } from 'src/app/shared/models/company';
import { Router, ActivatedRoute } from '@angular/router'
import { BusinessService } from '../../business.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/core/cep.service';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj.pipe';
import { CepResponse } from 'src/app/shared/models/cep-response';
import { IsLoadingService } from 'src/app/shared/is-loading.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
    private toaster: MatSnackBar
  ) {
    this.isLoading = isLoadingService.status
    this.isLoadingService.isLoading$.subscribe(status => {
      this.isLoading = status
    })
    console.log({ constructor: this.businessForm })
  }

  getBusiness(id: number) {
    console.log(`received id ${id}`)
    this.businessService.getBusinessById(id).subscribe(business => {
      console.log({ business })
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
    console.log({ test: this })
    console.log({ response })
    if (!response || response.erro) return
    const business = this.business as Business
    console.log({ startedForm: this.businessForm })
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
    console.log(this.businessForm.value)
    if (!this.businessForm.valid) return
    if (!this.business?.id) return

    const { id } = this.business
    const updateBusiness = {
      ...this.businessForm.value.company,
      cep: this.businessForm.value.address.cep
    }

    this.businessService.updateBusiness(id, updateBusiness)
      .subscribe(business => {
        console.log({ business })
        this.openToaster()
      })
  }

  openToaster() {
    this.toaster.open('Dados atualizados com sucessos', 'Ok', {
      verticalPosition: 'top', duration: 3000
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('getting business')
      console.log(`ID: ${params['id']}`)
      console.log({ params })
      this.getBusiness(Number(params['id']))
    }
    )
  }

}
