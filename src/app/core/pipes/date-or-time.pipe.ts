import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * transform a given date
 * and either return a date or
 * just the time, if the given date is today
 *
 * best is to use this pipe in combination
 * with the UTC-Timezone-Pipe, e.g. in a View:
 * {{event.event_created_at | addUtcTz | dateOrTime }}
 */
@Pipe({
  name: 'dateOrTime'
})
export class DateOrTimePipe implements PipeTransform {

  /**
   * a NG-DatePipe object
   */
  private ngDatePipe;

  /**
   * date or time pipe constructor
   */
  public constructor(@Inject(LOCALE_ID) private localeId: string) {
    this.ngDatePipe = new DatePipe(localeId);
  }

  /**
   * transform
   * @param value
   * @param args
   */
  transform(value: any, ...args: any[]): any {

    const currentDate = new Date();
    const valueDate = new Date(value);

    if (currentDate.getDate() === valueDate.getDate()
      && currentDate.getMonth() === valueDate.getMonth()
      && currentDate.getFullYear() === valueDate.getFullYear()) {
      return this.ngDatePipe.transform(value, 'shortTime');
    } else {
      return this.ngDatePipe.transform(value, 'shortDate');
    }

  }

}
