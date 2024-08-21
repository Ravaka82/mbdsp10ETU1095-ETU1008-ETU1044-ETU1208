import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-acceuil-admin',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './acceuil-admin.component.html',
  styleUrl: './acceuil-admin.component.css'
})
export class AcceuilAdminComponent implements OnInit{
  utilisateurs: any[] = [];
  displayedColumns: string[] = ['nom', 'prenom', 'email','actions'];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe(data => {
      this.utilisateurs = data;
    });
  }
  onDelete(utilisateur: any): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${utilisateur.nom}?`)) {
     
      this.utilisateurService.deleteUtilisateur(utilisateur._id).subscribe(() => {
        
        this.utilisateurs = this.utilisateurs.filter(u => u._id !== utilisateur._id);
      });
    }
  }
}
