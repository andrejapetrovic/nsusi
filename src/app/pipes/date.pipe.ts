import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, args?: any): any {
    if (!value) return "";
    return value.getDay() + ". " + value.getMonth()  + ". " + value.getFullYear();
  }

}
