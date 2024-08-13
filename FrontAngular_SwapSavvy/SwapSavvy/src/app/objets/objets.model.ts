import { Timestamp } from "rxjs";

export class User {
  _id?: string;
  utilisateur_id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  mot_de_passe?: string;
}

export interface Objet {
  id: number;
  titre: string;
  description: string;
  statut: string;
  etat: string;
  valeur_estimee: number;
  image_url: string;
  utilisateur: {
    id: number;
    prenom: string;
  };
}




