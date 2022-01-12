import { Component, Input } from '@angular/core';

/**
 * Icon Component for care icons
 * to easily use them in views
 */
@Component({
  selector: 'care-icon',
  template: `<span class="icon icon-{{name}}"></span>`
})
export class IconComponent {
  @Input() name;
}
