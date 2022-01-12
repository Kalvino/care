import { Pipe, PipeTransform } from '@angular/core';

/**
 * append the timezone +00:00 to a stime string
 * to make it a UTC time string
 *
 * Usage:
 * e.g. on your template {{ yourTimeString | addUtcTz | date: 'short' }}
 */
@Pipe({
  name: 'addUtcTz'
})
export class UtcTimezonePipe implements PipeTransform {

  /**
   * transformation of a time string into UTC time string
   * by appending +00:00 to a time string
   * @param value
   */
  transform(value: string): any {

    if (!value) {
      return '';
    }

    return value.replace(/\s/, 'T') + '+00:00';
  }
}
