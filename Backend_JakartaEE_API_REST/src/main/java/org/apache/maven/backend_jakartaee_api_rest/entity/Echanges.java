/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.apache.maven.backend_jakartaee_api_rest.entity;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Size;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

/**
 *
 * @author ASPIRE
 */
@Entity
@Table(name = "echanges")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Echanges.findAll", query = "SELECT e FROM Echanges e"),
    @NamedQuery(name = "Echanges.findByEchangeId", query = "SELECT e FROM Echanges e WHERE e.echangeId = :echangeId"),
    @NamedQuery(name = "Echanges.findByDateProposition", query = "SELECT e FROM Echanges e WHERE e.dateProposition = :dateProposition"),
    @NamedQuery(name = "Echanges.findByDateAcceptation", query = "SELECT e FROM Echanges e WHERE e.dateAcceptation = :dateAcceptation"),
    @NamedQuery(name = "Echanges.findByStatut", query = "SELECT e FROM Echanges e WHERE e.statut = :statut")})
public class Echanges implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "echange_id")
    private Integer echangeId;
    @Column(name = "date_proposition")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateProposition;
    @Column(name = "date_acceptation")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAcceptation;
    @Size(max = 50)
    @Column(name = "statut")
    private String statut;
    @OneToMany(mappedBy = "echangeId")
    private Collection<DetailsEchanges> detailsEchangesCollection;
    @JoinColumn(name = "utilisateur_acceptant_id", referencedColumnName = "utilisateur_id")
    @ManyToOne
    private Utilisateurs utilisateurAcceptantId;
    @JoinColumn(name = "utilisateur_proposant_id", referencedColumnName = "utilisateur_id")
    @ManyToOne
    private Utilisateurs utilisateurProposantId;

    public Echanges() {
    }

    public Echanges(Integer echangeId) {
        this.echangeId = echangeId;
    }

    public Integer getEchangeId() {
        return echangeId;
    }

    public void setEchangeId(Integer echangeId) {
        this.echangeId = echangeId;
    }

    public Date getDateProposition() {
        return dateProposition;
    }

    public void setDateProposition(Date dateProposition) {
        this.dateProposition = dateProposition;
    }

    public Date getDateAcceptation() {
        return dateAcceptation;
    }

    public void setDateAcceptation(Date dateAcceptation) {
        this.dateAcceptation = dateAcceptation;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    @XmlTransient
    public Collection<DetailsEchanges> getDetailsEchangesCollection() {
        return detailsEchangesCollection;
    }

    public void setDetailsEchangesCollection(Collection<DetailsEchanges> detailsEchangesCollection) {
        this.detailsEchangesCollection = detailsEchangesCollection;
    }

    public Utilisateurs getUtilisateurAcceptantId() {
        return utilisateurAcceptantId;
    }

    public void setUtilisateurAcceptantId(Utilisateurs utilisateurAcceptantId) {
        this.utilisateurAcceptantId = utilisateurAcceptantId;
    }

    public Utilisateurs getUtilisateurProposantId() {
        return utilisateurProposantId;
    }

    public void setUtilisateurProposantId(Utilisateurs utilisateurProposantId) {
        this.utilisateurProposantId = utilisateurProposantId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (echangeId != null ? echangeId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Echanges)) {
            return false;
        }
        Echanges other = (Echanges) object;
        if ((this.echangeId == null && other.echangeId != null) || (this.echangeId != null && !this.echangeId.equals(other.echangeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.Echanges[ echangeId=" + echangeId + " ]";
    }
    
}
