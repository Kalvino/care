import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutActions } from '../../../actions';
import * as fromLayout from '../../../reducers/layout.reducer';

/**
 * component to create the menu toggle button
 * for the header in pages
 * use this component to dispatch actions
 * to open / close the sidenav
 *
 * Pls. do not use the ionic menu button as
 * it will not change the state
 */
@Component({
  selector: 'care-menu-button',
  template: `
    <ion-buttons slot="start">
      <ion-button *ngIf="!showBack" (click)="onOpenMenu()" id="menuButton">
        <ion-icon name="menu"></ion-icon>
      </ion-button>

      <ion-back-button [icon]="''"
                       class="care-back-button"
                       text="G"
                       *ngIf="showBack" [defaultHref]="'/'"></ion-back-button>

    </ion-buttons>
  `,
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent {

  /**
   * showBack flag whether to show a showBack button or the regular menu button
   */
  @Input() showBack = false;

  /**
   * constructor
   * @param store
   */
  constructor(
    private store: Store<fromLayout.State>
  ) {
  }

  /**
   * open side nav
   */
  onOpenMenu() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

}
