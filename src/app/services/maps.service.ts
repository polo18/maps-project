import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { environment } from '../../environments/environment';
import { GeoJson } from '../models/Map.model';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
	markers: GeoJson[] = [];
	markersSubject = new Subject<GeoJson[]>();
  
  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken
  }

  emitMarkers() {
    this.markersSubject.next(this.markers);
  }

  getMarkers() {
    firebase.database().ref('/markers')
      .on('value', (data: DataSnapshot) => {
          this.markers = data.val() ? data.val() : [];
          this.emitMarkers();
        }
      );
  }

  saveMarkers(){
		firebase.database().ref('/markers').set(this.markers);
  }

  createMarker(newMarker: GeoJson) {
    this.markers.push(newMarker);
    this.saveMarkers();
    this.emitMarkers();
  }

  removeMarker(marker: GeoJson) {
    const bookIndexToRemove = this.markers.findIndex(
      (bookEl) => {
        if(bookEl === marker) {
          return true;
        }
      }
    );
    this.markers.splice(bookIndexToRemove, 1);
    this.saveMarkers();
    this.emitMarkers();
  }

}
