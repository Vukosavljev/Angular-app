import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getHhMm'
})
export class GetHhMmPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    const date = new Date(value);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }

}
