import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { BusinessService } from '../../business.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-edit-page',
  templateUrl: './business-edit-page.component.html',
  styleUrls: ['./business-edit-page.component.scss']
})
export class BusinessEditPageComponent implements OnInit {
  business?: Business
  name?: string
  businessForm = this.formBuilder.group({
    address: this.formBuilder.group({
      cep: ['', Validators.required],
      street: [''],
      district: [''],
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
    private formBuilder: FormBuilder
  ) { }

  getBusiness(id: number) {
    console.log(`received id ${id}`)
    const business = this.businessService.getBusinessById(id)

    if (!business) {
      console.log(`cant get id`)
      this.router.navigate(['/not-found'])
    }

    console.log({ business })

    this.business = business
  }

  onSubmit() {

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
