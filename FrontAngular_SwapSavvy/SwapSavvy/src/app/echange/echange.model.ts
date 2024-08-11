export interface Echange {
  id: number;
  objetDemandeId: number;
  objetOffreId: number;
  utilisateurDemandeId: number;
  utilisateurOffreId: number;
  dateEchange: Date;
  statut: string;
}
