import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

/**
 * about page component
 */
@Component({
  selector: 'care-about-page',
  templateUrl: './about-page.component.html'
})
export class AboutPageComponent implements OnInit {

  /**
   * version
   */
  public version;

  /**
   * on init callback
   */
  ngOnInit() {
    this.version = environment.version;
  }
}
