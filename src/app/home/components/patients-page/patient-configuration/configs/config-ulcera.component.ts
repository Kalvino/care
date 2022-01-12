import {Component} from '@angular/core';

@Component({
    selector: 'care-config-ulcera',
    templateUrl: './config-ulcera.component.html'
})
export class ConfigUlceraComponent {

    /**
     * initial config
     */
    configuration = {
        wound_prevention: {
            active: false,
            interval: 120
        }
    };

    /**
     * wound_prev_intervals intervals for the select element
     */
    wound_prev_intervals = [
        // {name: '15 min', value: 15},
        // {name: '75 min', value: 75},
        // {name: '90 min', value: 90},
        // {name: '105 min', value: 105},
        // {name: '120 min', value: 120},
        // {name: '135 min', value: 135},
        // {name: '150 min', value: 150},
        // {name: '165 min', value: 165},
        // {name: '180 min', value: 180},
        // {name: '195 min', value: 195},
        // {name: '210 min', value: 210},
        // {name: '225 min', value: 225},
        // {name: '240 min', value: 240}
    ];

    constructor() {

        let i;

        for (i = 15; i <= 360; i = i + 15) {
            this.wound_prev_intervals.push({
                name: i + ' min',
                value: i
            })
        }

    }

}
