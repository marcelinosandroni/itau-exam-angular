import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Business } from 'src/app/shared/models/business';
import { BusinessService } from '../../business.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-business-home-page',
  templateUrl: './business-home-page.component.html',
  styleUrls: ['./business-home-page.component.scss']
})
export class BusinessHomePageComponent implements OnInit, AfterViewInit {
  businesses?: Business[]
  columnsToDisplay = ['name', 'business', 'valuation', 'active', 'action']
  dataSource?: MatTableDataSource<any>


  @ViewChild(MatPaginator) pagination!: MatPaginator;

  constructor(
    private businessService: BusinessService,
    private router: Router
  ) {
  }

  goToBusiness(id: number): void {
    this.router.navigate([`/business/${id}`])
  }

  ngOnInit(): void {
    this.businesses = this.businessService.getBusinesses()
    this.dataSource = new MatTableDataSource<Business>(this.businesses)
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.pagination
    }
  }

}
