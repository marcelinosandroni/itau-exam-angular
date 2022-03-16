import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../../business.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CepService } from 'src/app/core/cep.service';
import { CnpjPipe } from 'src/app/shared/pipes/cnpj.pipe';
import { CepResponse } from 'src/app/shared/models/cep-response';
import { IsLoadingService } from 'src/app/shared/is-loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from 'src/app/core/language/language.service';
import { catchError, of } from 'rxjs';
import { LoggerService } from 'src/app/core/logger.service';
import { Translate } from 'src/app/shared/models/translate';
import { ActivatedRoute } from '@angular/router';

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
      street: [''],
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
  alertMessages!: Translate['alert']

  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private cnpjPipe: CnpjPipe,
    private isLoadingService: IsLoadingService,
    private toaster: MatSnackBar,
    private languageService: LanguageService,
    private loggerService: LoggerService
  ) {
    this.isLoading = isLoadingService.status
    this.isLoadingService.isLoading$.subscribe(status => {
      this.isLoading = status
    })
    this.languageService.getTranslation()
      .pipe(catchError(e => {
        console.log({ error: e })
        return of(e)
      }))
      .subscribe(translate => {
        this.alertMessages = translate.alert
      })
  }

  getBusiness(id: number) {
    const toaster = this.openToaster

    // .pipe(catchError((e: any) => {
    //   this.loggerService.error(e)
    //   toaster(e, 'error'})
    //   return of(e)
    // }))
    this.businessService.getBusinessById(id)
      .pipe(catchError(e => {
        this.loggerService.error(e)
        toaster(this.alertMessages.update, 'error')
        return of(e)
      }))
      .subscribe(business => {
        this.business = business
        this.cepService.find(business.cep)
          .pipe(catchError(error => {
            this.loggerService.error(error)
            this.openToaster(error, 'error')
            return of(error)
          }))
          .subscribe(this.updateAddressForm)
      })
  }

  onChangeCep() {
    this.cepService.find(this.businessForm.value.address.cep)
      .subscribe(this.updateAddressForm)
  }

  // changed to arrow function, this inside subscribe dont work even with binded this
  updateAddressForm = (response: CepResponse) => {
    if (!response || response.erro) {
      this.loggerService.error(this.alertMessages.cepWarn)
      this.openToaster(this.alertMessages.cepWarn, 'warn')
      return
    }
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
        this.business = business
        this.openToaster(this.alertMessages.update)
      })
  }

  openToaster(message: string, type?: 'info' | 'warn' | 'error') {
    this.toaster.open(message, '', {
      verticalPosition: 'top', duration: 3000, panelClass: [type || '', 'no-action']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getBusiness(Number(params['id']))
    }
    )
  }

}
