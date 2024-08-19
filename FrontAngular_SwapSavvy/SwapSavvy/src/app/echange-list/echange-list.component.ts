import { Component, OnInit } from '@angular/core';
import { EchangeService } from '../services/echange.service';
import { Echange } from '../echange/echange.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-echange-list',
  standalone: true,
  imports: [RouterModule, CommonModule, BrowserModule],
  templateUrl: './echange-list.component.html',
  styleUrl: './echange-list.component.css'
})
export class EchangeListComponent implements OnInit {
  echanges: any[] = [];
  user: any;
  constructor(private echangeService: EchangeService) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    console.log('Données stockées dans localStorage :', user);
    if (user) {
      this.user = JSON.parse(user);
      console.log('Utilisateur récupéré :', this.user);
    } else {
      console.error('Aucun utilisateur trouvé dans localStorage');
    }
    this.listesobjetsouhaite();
  }
  listesobjetsouhaite(){
    const utilisateur_id = this.user._id;
    this.echangeService.getEchangesByUtilisateur(utilisateur_id)
      .subscribe(
        (data) => {
          this.echanges = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des échanges:', error);
        }
      );
  }
  }

