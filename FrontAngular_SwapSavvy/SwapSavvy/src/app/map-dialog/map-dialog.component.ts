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
    this.map = L.map('map', {
      center: [-18.90662643252923,47.526624991911596], // Coordonnées pour Antananarivo
      zoom: 12 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    if (this.data && this.data.objet_utilisateur_proposant && this.data.objet_utilisateur_acceptant) {
      this.addMarker(this.data.objet_utilisateur_proposant.position, this.data.objet_utilisateur_proposant.nom);
      this.addMarker(this.data.objet_utilisateur_acceptant.position, this.data.objet_utilisateur_acceptant.nom);
    }
  }

  private addMarker(position: { coordinates: [number, number] }, name: string): void {
    if (this.map) {
      const marker = L.marker([position.coordinates[1], position.coordinates[0]])
        .addTo(this.map)
        .bindPopup(`<b>${name}</b><br>Latitude: ${position.coordinates[1]}<br>Longitude: ${position.coordinates[0]}`);

      marker.openPopup();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
