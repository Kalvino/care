import { Component } from '@angular/core';

@Component({
  selector: 'care-config-activity-profile',
  templateUrl: './config-activity-profile.component.html'
})
export class ConfigActivityProfileComponent {
  configuration = {
    activity_profile: {
      active: true
    }
  };
}
