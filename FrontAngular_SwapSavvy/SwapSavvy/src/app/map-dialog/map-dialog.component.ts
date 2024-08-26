import { Component, AfterViewInit, Inject } from '@angular/core';
import * as L from 'leaflet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent implements AfterViewInit {
  private map: L.Map | undefined;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  private initMap(): void {

    if (this.data && this.data.objet_utilisateur_proposant && this.data.objet_utilisateur_proposant.position) {
      const proposingCoordinates: [number, number] = [
        this.data.objet_utilisateur_proposant.position.coordinates[1],
        this.data.objet_utilisateur_proposant.position.coordinates[0]
      ];

      this.map = L.map('map', {
        center: proposingCoordinates,
        zoom: 12
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 2,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);


      this.addMarker(proposingCoordinates, this.data.objet_utilisateur_proposant.nom);

      if (this.data.objet_utilisateur_acceptant && this.data.objet_utilisateur_acceptant.position) {
        const acceptingCoordinates: [number, number] = [
          this.data.objet_utilisateur_acceptant.position.coordinates[1],
          this.data.objet_utilisateur_acceptant.position.coordinates[0]
        ];
        this.addMarker(acceptingCoordinates, this.data.objet_utilisateur_acceptant.nom);


        this.addRoute(proposingCoordinates, acceptingCoordinates);
      }
    } else {
      console.error("Les coordonnées de l'utilisateur proposant ne sont pas disponibles.");
    }
  }

  private addMarker(position: [number, number], name: string): void {
    if (this.map) {
      const marker = L.marker(position)
        .addTo(this.map)
        .bindPopup(`<b>${name}</b><br>Latitude: ${position[1]}<br>Longitude: ${position[0]}`);

      marker.openPopup();
    }
  }

  private addRoute(start: [number, number], end: [number, number]): void {
    if (this.map) {
      const route = L.polyline([start, end], { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(route.getBounds());
    }
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
