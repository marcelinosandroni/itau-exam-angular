import { AfterViewInit, Component, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { EventEmitter } from '@angular/core';
import { PaginationIntl } from '../../providers/pagination.provider';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [{
    provide: MatPaginatorIntl, useClass: PaginationIntl
  }]
})
export class PaginationComponent implements AfterViewInit {
  @Output() setDataSource: EventEmitter<any> = new EventEmitter()
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  setPagination() {
    this.setDataSource.emit(this.pagination)
  }

  ngAfterViewInit(): void {
    this.setPagination()
  }
}
