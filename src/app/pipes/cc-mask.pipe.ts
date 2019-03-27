import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'maskcreditcard' })

export class MaskCreditCardPipe implements PipeTransform {
  transform(creditCardNumber: number): string {
    const ccLength = creditCardNumber.toString().length;
    const lastFour = creditCardNumber.toString().slice(ccLength - 4, ccLength);

    return `****${lastFour}`
  }
}
