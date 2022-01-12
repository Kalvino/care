import { Component } from '@angular/core';

@Component({
  selector: 'care-config-fall-prevention',
  templateUrl: './config-fall-prevention.component.html'
})
export class ConfigFallPreventionComponent {
  configuration = {
    fall_prevention: {
      active: false,
      wholeDay: false,
      interval: 5,
      start: null,
      end: null
    }
  };

  /**
   * fall_prev_intervals intervals for the select element
   */
  fall_prev_intervals = [
    {name: '5 min', value: 5},
    {name: '10 min', value: 10},
    {name: '15 min', value: 15},
    {name: '20 min', value: 20},
    {name: '25 min', value: 25},
    {name: '30 min', value: 30},
    {name: '35 min', value: 35},
    {name: '40 min', value: 40},
    {name: '45 min', value: 45},
    {name: '50 min', value: 50},
    {name: '55 min', value: 55},
    {name: '60 min', value: 60}
  ];
}
