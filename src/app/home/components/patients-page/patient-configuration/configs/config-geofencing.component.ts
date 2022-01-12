import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'care-config-geofencing',
  templateUrl: './config-geofencing.component.html'
})
export class ConfigGeofencingComponent {
  /**
   * config model
   * TODO: needs replacement once we are saving real data
   */
  configuration = {
    geofencing: {
      active: false
    }
  };

  /**
   * constructor
   * @param router
   */
  constructor(private router: Router) {
  }

  /**
   * navigation funktion
   */
  navigateTo() {
    this.router.navigate(['/', 'patients', 'details', 'geo-zone']);
  }
}
