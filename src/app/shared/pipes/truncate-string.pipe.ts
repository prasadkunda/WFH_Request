import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString',
  standalone: true
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, limit: number = 200): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + '...';
  }


}
