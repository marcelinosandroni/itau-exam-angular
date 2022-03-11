import { Component, Input, OnInit } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { BusinessService } from '../../business.service';
import { switchMap } from 'rxjs';
import { Location } from '@angular/common'
import { PathLocationStrategy } from '@angular/common'

@Component({
  selector: 'app-business-edit-page',
  templateUrl: './business-edit-page.component.html',
  styleUrls: ['./business-edit-page.component.scss']
})
export class BusinessEditPageComponent implements OnInit {
  business?: Business
  name?: string

  constructor(private route: ActivatedRoute, private router: Router, private businessService: BusinessService) { }

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
