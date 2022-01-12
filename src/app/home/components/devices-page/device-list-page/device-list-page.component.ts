import { Component, OnInit } from '@angular/core';
import { Device } from '../../../../core/models/device';
import { ActivatedRoute } from '@angular/router';

/**
 * devices list page component
 * displays a list of devices
 * @deprecated probably not necessary
 */
@Component({
  selector: 'care-device-list-page',
  templateUrl: 'device-list-page.component.html'
})
export class DeviceListPageComponent implements OnInit {

  /**
   * devices an array with devices
   */
  devices: Device[] = [];

  /**
   * constructor
   * @param route
   */
  constructor(private route: ActivatedRoute) {
  }

  /**
   * on init lifecycle hook
   */
  ngOnInit() {
    // this.devices = this.route.data.devices;
  }
}
