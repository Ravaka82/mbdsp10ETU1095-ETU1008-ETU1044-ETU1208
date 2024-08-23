import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { EchangeService } from '../services/echange.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ObjetService } from '../services/objet.service';

@Component({
  selector: 'app-acceuil-admin',
  standalone: true,
  imports: [MatTableModule, CommonModule, DatePipe],
  templateUrl: './acceuil-admin.component.html',
  styleUrls: ['./acceuil-admin.component.css']
})
export class AcceuilAdminComponent implements OnInit {
  utilisateurs: any[] = [];
  echanges: any[] = [];
  displayedColumnsUtilisateurs: string[] = ['nom', 'prenom', 'email', 'actions'];
  displayedColumnsEchanges: string[] = [ 'type','utilisateurs', 'date', 'statut'];


  // Statistiques
  utilisateurCount: number = 0;
  countEchangesAcceptes: number = 0;
  countEchangesRefuses: number = 0;
  countEchangesEnAttente: number = 0;
  countEchangesEnCours: number = 0;

  constructor(
    private utilisateurService: UtilisateurService,
    private echangeService: EchangeService,
    private objetService: ObjetService
  ) {}

  ngOnInit(): void {
    // Charger les utilisateurs
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
      this.utilisateurCount = data.length; // Mettre à jour le nombre d'utilisateurs
    });

    // Charger les statistiques des échanges
    this.echangeService.countEchangesAccepted().subscribe(count => this.countEchangesAcceptes = count);
    this.echangeService.countEchangesRefused().subscribe(count => this.countEchangesRefuses = count);
    this.echangeService.countEchangesEnAttente().subscribe(count => this.countEchangesEnAttente = count);
    this.echangeService.countEchangesEnCours().subscribe(count => this.countEchangesEnCours = count);

    // Charger les échanges
    this.echangeService.getAllEchanges().subscribe(data => {
      this.echanges = data;
      console.log(data)
    });
  }

  onDelete(utilisateur: any): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${utilisateur.nom}?`)) {
      // Supprimer les objets associés à l'utilisateur
      this.objetService.deleteObjetUtilisateur(utilisateur._id).subscribe({
        next: () => {
          // Puis supprimer l'utilisateur
          this.utilisateurService.deleteUtilisateur(utilisateur._id).subscribe({
            next: () => {
              this.utilisateurs = this.utilisateurs.filter(u => u._id !== utilisateur._id);
              this.utilisateurCount--;
            },
            error: (err) => console.error('Error deleting utilisateur:', err)
          });
        },
        error: (err) => console.error('Error deleting objects:', err)
      });
    }
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'accepter':
        return 'status-accepted';
      case 'en attente':
        return 'status-pending';
      case 'refuser':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  }
}
