import { Injectable, ViewChild } from "@angular/core"
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator"
import { Subject } from "rxjs"
import { LanguageService } from "src/app/core/language/language.service"

@Injectable()
export class PaginationIntl implements MatPaginatorIntl {
  changes = new Subject<void>()

  firstPageLabel = ''
  itemsPerPageLabel = ''
  lastPageLabel = ''
  nextPageLabel = ''
  previousPageLabel = ''
  page = ''
  onePage = ''
  of = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private languageService: LanguageService) {
    this.languageService.getTranslation().subscribe(translation => {
      const { first, last, next, prev, perPage, page, firstPage, of } = translation.pagination
      this.firstPageLabel = first
      this.itemsPerPageLabel = perPage
      this.lastPageLabel = last
      this.firstPageLabel = first
      this.nextPageLabel = next
      this.previousPageLabel = prev
      this.page = page
      this.onePage = firstPage
      this.of = of
    })
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.onePage
    }
    const amountPages = Math.ceil(length / pageSize);
    const pageName = this.page
    const of = this.of
    return `${pageName} ${page + 1} ${of} ${amountPages}`;
  }



}
