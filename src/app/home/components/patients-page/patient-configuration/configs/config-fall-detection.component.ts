import { Component } from '@angular/core';

@Component({
  selector: 'care-config-fall-detection',
  templateUrl: './config-fall-detection.component.html'
})
export class ConfigFallDetectionComponent {
  configuration = {
    fall_detection: {
      active: false,
      always: true,
      laying: false,
      inactive: false
    }
  };
}
