import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { menuItems } from './menu-items';
import { Store } from '@ngrx/store';
import { AuthActions, AuthApiActions } from '../../../auth/actions';
import { LayoutActions } from '../../actions';
import * as fromAuth from '../../../auth/reducers';
import * as fromLayout from '../../reducers/layout.reducer';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from "../../services/navigation.service";
import { IMenuItem } from "../../../core/models/menu.model";

/**
 * side menu component
 */
@Component({
  selector: 'care-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  /**
   * closeMenu event emitter for closing the menu
   */
  @Output() closeMenu = new EventEmitter();

  public menuItems: IMenuItem[];

  /**
   * constructor
   * @param authStore auth store
   * @param layoutStore layout store
   * @param translate translation service
   */
  constructor(
    private authStore: Store<fromAuth.State>,
    private layoutStore: Store<fromLayout.State>,
    private translate: TranslateService,
    private navService: NavigationService
  ) {
  }

  ngOnInit() {
    //subscribe to the navigation service
    this.navService.menuItems$.subscribe(menu => {
      console.log(menu);
      this.menuItems = menu;
    })
  }

  /**
   * logout the user
   */
  onConfirmLogout() {
    this.onCloseMenu();

    //TODO - if needed: this.authStore.dispatch(new AuthActions.LogoutConfirmation());
    this.authStore.dispatch(new AuthApiActions.LogoutSuccess());
  }

  /**
   * auto close menu when navigating
   */
  onCloseMenu() {
    this.layoutStore.dispatch(new LayoutActions.CloseSidenav());
  }
}
