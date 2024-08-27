/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mg.itu.tptmbdsp10.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author Dina
 */
@Entity
public class EchangeObjet implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "objet_propose_id", nullable = false)
    private Objet objetPropose;
    
    @ManyToOne
    @JoinColumn(name = "objet_demande_id", nullable = false)
    private Objet objetDemande;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_proposant_id", nullable = false)
    private User utilisateurProposant;
    
    @ManyToOne
    @JoinColumn(name = "utilisateur_demande_id", nullable = false)
    private User utilisateurDemande;
    
    private String statut;  // En attente, Accepté, Refusé
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateProposition;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateEchange;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    public Objet getObjetPropose() {
        return objetPropose;
    }

    public void setObjetPropose(Objet objetPropose) {
        this.objetPropose = objetPropose;
    }
    
    public Objet getObjetDemande() {
        return objetDemande;
    }

    public void setObjetDemande(Objet objetDemande) {
        this.objetDemande = objetDemande;
    }
    
    public User getUtilisateurProposant() {
        return utilisateurProposant;
    }

    public void setUtilisateurProposant(User utilisateurProposant) {
        this.utilisateurProposant = utilisateurProposant;
    }

    public User getUtilisateurDemande() {
        return utilisateurDemande;
    }

    public void setUtilisateurDemande(User utilisateurDemande) {
        this.utilisateurDemande = utilisateurDemande;
    }
    
    public Date getDateProposition() {
        return dateProposition;
    }

    public void setDateProposition(Date dateProposition) {
        this.dateProposition = dateProposition;
    }
    
    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof EchangeObjet)) {
            return false;
        }
        EchangeObjet other = (EchangeObjet) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "mg.itu.tptmbdsp10.entity.EchangeObjet[ id=" + id + " ]";
    }
}
