export interface Echange {
  _id: string;
  utilisateur_proposant_id: string;
  utilisateur_acceptant_id: string;
  objet_proposant: string;
  objet_acceptant: string;
  date_proposition: Date;
  date_acceptation: Date|null;
  statut: string;
}

