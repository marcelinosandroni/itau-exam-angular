import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CepPipe } from '../pipes/cep.pipe';


// Directive to use the Pipe to transform values without emitting the masked value to the control model

@Directive({
  selector: '[maskCep]'
})
export class CepDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private cepPipe: CepPipe,
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

  @HostListener('input', ['$event']) onChange(event: Event) {
    const value = (event.target as HTMLInputElement).value
    const formatedCep = this.cepPipe.transform(value)
    this.element.nativeElement.value = formatedCep
  }

}
