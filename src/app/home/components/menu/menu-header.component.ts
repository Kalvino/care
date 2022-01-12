import { Component, Input } from '@angular/core';
import { User } from '../../../core/models/user';

/**
 * component to create the menu header in the sidenav
 */
@Component({
  selector: 'care-menu-header',
  template: `
    <div class="menu-header">
      <div class="menu-logo">
        <img src="/assets/img/login-logo.png" />
      </div>
      <div class="user-info">
        <h1 class="row fs20pt care-darkgreen">{{user.firstName}} {{user.lastName}}</h1>
        <span class="row fs16pt text-muted">{{user.userName}}</span>
      </div>
    </div>`,
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent {
  @Input() user: User;
}
