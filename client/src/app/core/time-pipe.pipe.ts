import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {

  transform(value: any): any {
    const date = value.split('T');
    const time = date[1].split(':');
    return `${date[0]} | ${time[0]}:${time[1]}`;
  }

}
