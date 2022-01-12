import {Component, Input} from '@angular/core';
import {IEvent} from '../../../../../core/models/event';

/**
 * the list of patient events
 * as input the component accepts an array of events
 */
@Component({
    selector: 'care-patient-event-list',
    styleUrls: ['./patient-event-list.component.scss'],
    templateUrl: './patient-event-list.component.html'
})
export class PatientEventListComponent {
    /**
     * events input an array with events
     */
    @Input() events: IEvent[];

    /**
     * this is not the best solution to filter
     * critical events.
     * Re-factor care-Cloud and add a flag 'isCritical'
     * to enable more easy filtering!
     */
    private _criticalEvents = ['022', '057', '025', '023', '021'];

    /**
     * set initial tab index
     */
    tabIndex = 1;

    /**
     * set the tabindex
     * @param index
     */
    setTabIndex(index) {
        this.tabIndex = index;
    }

    /**
     * filter critical events from the
     * regular events
     *
     * this is not the best solution to filter
     * critical events.
     * Re-factor care-Cloud and add a flag 'isCritical'
     * to enable more easy filtering!
     *
     */
    criticalEvents = () => {
        return this.events.filter((event: IEvent) => {
            return (this._criticalEvents.indexOf(event.eventtype.code) !== -1) ? event : null;
        });
    };

    /**
     * check if the event is critical
     * @param event
     * @deprecated once there is a flag inside the data this needs to be refactored
     */
    isCritical = (event: IEvent) => {
        return (this._criticalEvents.indexOf(event.eventtype.code) !== -1) ? 'critical' : '';
    };

    /**
     * maps a event code to an icon
     * @param event
     */
    mapIcon = (event: IEvent) => {
        console.log(event);
        switch (event.eventtype.code) {
            case '022':
                return 'care-sensor-status';

            case '025':
            case '026':
                return 'care-geofencing';

            case '021':
                return 'care-fall';

            case '024':
            case '057':
                return 'care-ulcera';

            case '023':
            case 'S001':
                return 'care-alarm';

            default:
                return 'care-alarm';

        }
    };
}
