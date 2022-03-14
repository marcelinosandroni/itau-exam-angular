import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { LanguageService } from 'src/app/core/language/language.service';
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
export class PaginationComponent implements OnInit, AfterViewInit {
  @Output() setDataSource: EventEmitter<any> = new EventEmitter()
  @ViewChild(MatPaginator) pagination!: MatPaginator;

  setPagination() {
    this.setDataSource.emit(this.pagination)
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.setPagination()
  }
}
