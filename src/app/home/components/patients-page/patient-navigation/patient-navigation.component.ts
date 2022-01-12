import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { IonBackdrop, IonFab } from '@ionic/angular';

/**
 * patient navigation component
 * shows a fab button on the lower right screen
 * and allows navigating to subviews
 *
 * @deprecated Implements FAB-Button, BUT with new design a list is required
 * re-impl. the navigation with the list (see patient-details.component.html)
 */
@Component({
  selector: 'care-patient-navigation',
  templateUrl: './patient-navigation.component.html',
  styleUrls: ['./patient-navigation.component.scss']
})
export class PatientNavigationComponent {

  /**
   * contains a flag to indicate
   * if the current user is admin
   * for the selected patient
   */
  @Input() isAdmin;

  /**
   * ionFag ref on the fab button
   */
  @ViewChild('ionFab') ionFab: IonFab;

  /**
   * @var show/hide backdrop
   */
  hideBackdrop = true;

  /**
   * construct
   * @param store
   * @param router
   */
  constructor(
    private store: Store<any>,
    private router: Router
  ) {
  }

  /**
   * go to a certain path
   * @param page
   */
  onGoto(page) {
    this.toggleBackdrop();
    this.router.navigate(['patients', 'details', page]);
  }

  /**
   * toggle flag to show/hide backdrop
   */
  toggleBackdrop() {
    this.hideBackdrop = !this.hideBackdrop;
  }

  /**
   * click on the backdrop
   */
  onBackdropClicked() {
    this.ionFab.close();
    this.hideBackdrop = true;
  }
}
