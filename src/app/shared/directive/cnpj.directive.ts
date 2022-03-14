import { Directive, ElementRef, Host, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CnpjPipe } from '../pipes/cnpj.pipe';

// Directive to use the Pipe to transform values without emitting the masked value to the control model

@Directive({
  selector: '[maskCnpj]'
})
export class CnpjDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private cnpjPipe: CnpjPipe,
    private ngControl: NgControl
  ) { }

  ngOnInit() {
    this.ngControl.control?.valueChanges.subscribe(() => {
      const value = this.element.nativeElement.value.replace(/\D/g, '')

      this.ngControl.control?.setValue(value, {
        emitEvent: false,
        emitModelToViewChange: false,
        emitViewToModelChange: false
      })
    })

  }

  // Update mask on changes using the Pipe
  @HostListener('input', ['$event']) onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value
    const formatedCnpj = this.cnpjPipe.transform(value)
    this.element.nativeElement.value = formatedCnpj
  }

}
