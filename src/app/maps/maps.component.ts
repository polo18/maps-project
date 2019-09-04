import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import * as mapboxgl from 'mapbox-gl';
import { MapsService } from '../services/maps.service';
import { GeoJson, FeatureCollection } from '../models/Map.model';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit, OnDestroy {
 /// default settings
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  message = 'Name of place!';

  // data
  source: any;
  markers: GeoJson[];
  markersSubscription: Subscription;

  constructor(private mapService: MapsService) {
  }

  ngOnInit() {
  	this.markersSubscription = this.mapService.markersSubject.subscribe(
      (markers: GeoJson[]) => {
        this.markers = markers;
      }
    );
    this.mapService.emitMarkers();
  
    this.initializeMap()

  }

  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        })
      });
    }

    this.buildMap()

  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });


    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat]
      const newMarker   = new GeoJson(coordinates, { message: this.message })
      this.mapService.createMarker(newMarker)
    })


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('firebase', {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: []
         }
      });

      /// get source
      this.source = this.map.getSource('firebase')

      /// subscribe to realtime database and set data source
      this.mapService.markersSubject.subscribe(
      	(markers) => {
        	let data = new FeatureCollection(markers)
      		this.source.setData(data)
      	}
    	);
    	this.mapService.emitMarkers();
			
      /// create map layers with realtime data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      })

    })

  }

  /// Helpers
  removeMarker(marker) {
    this.mapService.removeMarker(marker)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  }

  ngOnDestroy() {
    this.markersSubscription.unsubscribe();
  }
}