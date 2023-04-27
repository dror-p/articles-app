import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() markers: any[] =[] ;
  @Output() markersChange = new EventEmitter();

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  center: google.maps.LatLngLiteral = {
    lat: this.lat,
    lng: this.lng
  }  
  
  zoom = 1
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 2,
  }

  constructor() { 
    this.markers.push({
      position: 
        { lat: 38.9987208, lng: -77.2538699 },
      label: {
        text: 'Marker label ' ,
      },
      title: 'Marker title ' ,
    })
  } 

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
}