import { Component, OnInit, ViewChild } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../../business.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LanguageService } from 'src/app/core/language/language.service';


@Component({
  selector: 'app-business-home-page',
  templateUrl: './business-home-page.component.html',
  styleUrls: ['./business-home-page.component.scss']
})
export class BusinessHomePageComponent implements OnInit {
  businesses?: Business[]
  columnsToDisplay = ['name', 'business', 'valuation', 'active', 'action']
  dataSource?: MatTableDataSource<any>
  currency: string = 'PT'
  search: string = ''


  @ViewChild(MatPaginator) pagination!: MatPaginator;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.languageService.getCurrency().subscribe(currency => {
      this.currency = currency
    })
  }

  setPagination(pagination: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = pagination
    }
  }

  goToBusiness(id: number): void {
    this.router.navigate([`/business/${id}`])
  }

  filterSearch() {
    console.log({ search: this.search })
    const searchPattern = new RegExp(`${this.search}`, 'i')
    if (this.businesses) {
      console.log('FILTERING')
      const filteredBusinesses = this.businesses
        .filter(business => searchPattern.test(business.name))

      if (this.dataSource?.data) {
        this.dataSource.data = filteredBusinesses
      }
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Business>(this.businesses)
    this.businessService.getBusinesses().subscribe((business) => {
      this.businesses = business
      this.dataSource!.data = this.businesses
    })
  }

  // ngAfterViewInit() {
  //   if (this.dataSource) {
  //     this.dataSource.paginator = this.pagination
  //   }
  // }

}
