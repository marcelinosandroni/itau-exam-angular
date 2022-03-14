import { ChangeDetectorRef, Injectable, ViewChild } from "@angular/core"
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
  total = ''
  register = ''

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private languageService: LanguageService,
    private changeDetector: ChangeDetectorRef) {
    this.updateLabels()
    this.languageService.onChance.subscribe(() => {
      this.updateLabels()
      this.changeDetector.detectChanges()
    })
  }

  updateLabels() {
    this.languageService.getTranslation().subscribe(translation => {
      const { first, last, next, prev, perPage, page, firstPage, of, total, register } = translation.pagination
      this.firstPageLabel = first
      this.itemsPerPageLabel = perPage
      this.lastPageLabel = last
      this.firstPageLabel = first
      this.nextPageLabel = next
      this.previousPageLabel = prev
      this.page = page
      this.onePage = firstPage
      this.of = of
      this.total = total
      this.register = register
    })
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.onePage
    }
    const amountPages = Math.ceil(length / pageSize);
    const pageName = this.page
    const of = this.of
    const total = this.total
    const register = this.register
    return `${pageName} ${page + 1} ${of} ${amountPages} ${total} ${length} ${register}`;
  }
}
