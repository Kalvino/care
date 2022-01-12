import { Component, ElementRef, Input, OnInit, ViewChild, Renderer2 } from '@angular/core';

/**
 * an expandable view element
 * takes two arguments:
 * expanded: shows the element with the defined height
 * expandHeight: define the hight for the element
 *
 * Usage:
 * <care-expandable [expanded]="true | false" [expandHeight]="'2rem'"> ... the content ... </care-expandable>
 *
 * You can use any valid css height, e.g. 100px, 2rem, 10%,....
 * If expandHeight is unset 'auto' will be used
 */
@Component({
  selector: 'care-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent implements OnInit {

  /**
   * expanded boolean input variable to hide|show the element
   */
  @Input() expanded;

  /**
   * expandedHeight string any css value for height
   */
  @Input() expandHeight = null;

  /**
   * ref to the expandable element
   */
  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;

  /**
   * constructor
   * @param renderer Renderer2
   */
  constructor(public renderer: Renderer2) {
  }

  /**
   * on init lifecycle callback
   */
  ngOnInit() {
    this.renderer
      .setStyle(this.expandWrapper.nativeElement, 'height', (this.expandHeight) ? this.expandHeight : 'auto');
  }
}
