export interface Echange {
  id: number;
  objetOffreId: number;
  objetDemandeId: number;
  utilisateurOffreId: number;
  utilisateurDemandeId: number;
  dateProposition: Date;
  dateEchange?: Date;
  statut: string;
}
