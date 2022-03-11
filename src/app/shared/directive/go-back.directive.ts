import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common'

@Directive({
  selector: '[appGoBack]'
})
export class GoBackDirective {

  constructor(private location: Location) { }

  @HostListener('click') goBack() {
    this.location.back()
  }

}
