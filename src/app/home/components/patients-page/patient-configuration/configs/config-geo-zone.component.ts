import { AfterViewInit, Component, OnInit } from '@angular/core';

declare let L;

@Component({
  selector: 'care-config-geo-zone',
  templateUrl: './config-geo-zone.component.html',
  styles: []
})
export class ConfigGeoZoneComponent implements OnInit, AfterViewInit {

  /**
   * the map
   */
  map;

  /**
   * constructor
   */
  constructor() {
  }

  ngOnInit(): void {
    this.map = L.map('map').setView([49.89145501695073, 10.886914730072023], 13);

    // TODO: You need to add an access token for MapBox
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      maxZoom: 12,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
  }
}
