import { Injectable, Pipe, PipeTransform } from '@angular/core';

// CNPJ Pipe to mask form inputs
// there are some libraries that do this, but I wanted to implement it to see how to manipulate the data with angular

@Pipe({
  name: 'cnpj'
})
export class CnpjPipe implements PipeTransform {
  maxLength = 14

  transform(cnpj: number | string): string {
    if (!cnpj) return ''

    if (typeof cnpj === 'number') {
      cnpj = String(cnpj)
    }

    const cleanCnpj = cnpj.replace(/\D/g, '').slice(0, this.maxLength)

    const cnpjNumbers = [2, 3, 3, 4, 2]
    const cnpjPattern = "^(\\d{1,2})?((?<=\\d{2})\\d{1,3})?((?<=\\d{3})\\d{1,3})?((?<=\\d{8})\\d{1,4})?((?<=\\d{12})\\d{1,2})?$"

    const sumPartialList = (list: number[], end: number) => list.slice(0, end + 1).reduce((sum, item) => sum + item, 0)

    const outputLength = cnpjNumbers.reduce((output, _, index) =>
      cleanCnpj.length > sumPartialList(cnpjNumbers, index) ? output + 1 : output
      , 1)

    const outputSeparators = ['.', '.', '/', '-']
    let outputFormat = Array.from({ length: outputLength }, (_, index) => `${index ? outputSeparators[index - 1] : ''}$${index + 1}`).join('')

    const formatedCnpj = cleanCnpj.replace(RegExp(cnpjPattern), outputFormat)
    return formatedCnpj
  }
}
