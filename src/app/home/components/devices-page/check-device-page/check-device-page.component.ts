import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../../../reducers/';
import { DevicePageActions } from '../../../actions';

/**
 * add device page
 */
@Component({
  selector: 'care-check-device-page',
  templateUrl: './check-device-page.component.html'
})
export class CheckDevicePageComponent {

  /**
   * error$ subscr. for error state
   */
  error$ = this.store.pipe(
    select(fromHome.getDevicePageError)
  );

  /**
   * pending$ subsc. for pending state
   */
  pending$ = this.store.pipe(
    select(fromHome.getDevicePagePending)
  );

  /**
   * constructor
   * @param store
   */
  constructor(private store: Store<fromHome.State>) {
  }

  /**
   * callback for emitted event by check-device-form
   * @param code
   */
  onFormSubmitted(code: string) {
    this.store.dispatch(new DevicePageActions.CheckDevice({code}));
  }
}
