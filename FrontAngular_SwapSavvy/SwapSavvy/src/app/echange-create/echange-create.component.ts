import { Component } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-echange-create',
  standalone: true,
  imports: [BrowserModule, FormsModule],
  templateUrl: './echange-create.component.html',
  styleUrl: './echange-create.component.css'
})
export class EchangeCreateComponent {
  echange: Echange = {
    id: 0,
    objetDemandeId: 0,
    objetOffreId: 0,
    utilisateurDemandeId: 0,
    utilisateurOffreId: 0,
    dateEchange: new Date(),
    statut: 'En attente'
  };

  constructor(private echangeService: EchangeService) { }

  proposerEchange(): void {
    this.echangeService.createEchange(this.echange).subscribe(() => {
      alert('Échange proposé avec succès');
    });
  }
}
