import { Pipe, PipeTransform } from '@angular/core';

// CEP Pipe to mask forms inputs
// there are some libraries that do this, but I wanted to implement it to see how to manipulate the data with angular

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {
  maxLength = 10

  transform(cep: number | string): string {
    if (!cep) return ''

    if (typeof cep === 'number') {
      cep = String(cep)
    }

    const cleanCep = cep.replace(/\D/g, '').slice(0, this.maxLength)

    const cepPattern = new RegExp('^(\\d{1,2})?((?<=\\d{2})\\d{1,3})?((?<=\\d{5})\\d{1,3})?$')

    if (cleanCep.length <= 2) {
      return cleanCep.replace(cepPattern, '$1')
    }
    if (cleanCep.length <= 5) {
      return cleanCep.replace(cepPattern, '$1.$2')
    }
    return cleanCep.replace(cepPattern, '$1.$2-$3')
  }

}
