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
import jakarta.persistence.Table;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 *
 * @author ASPIRE
 */
@Entity
@Table(name = "details_echanges")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "DetailsEchanges.findAll", query = "SELECT d FROM DetailsEchanges d"),
    @NamedQuery(name = "DetailsEchanges.findByDetailsEchangeId", query = "SELECT d FROM DetailsEchanges d WHERE d.detailsEchangeId = :detailsEchangeId")})
public class DetailsEchanges implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "details_echange_id")
    private Integer detailsEchangeId;
    @JoinColumn(name = "echange_id", referencedColumnName = "echange_id")
    @ManyToOne
    private Echanges echangeId;
    @JoinColumn(name = "objet_id", referencedColumnName = "objet_id")
    @ManyToOne
    private Objets objetId;
    @JoinColumn(name = "utilisateur_id", referencedColumnName = "utilisateur_id")
    @ManyToOne
    private Utilisateurs utilisateurId;

    public DetailsEchanges() {
    }

    public DetailsEchanges(Integer detailsEchangeId) {
        this.detailsEchangeId = detailsEchangeId;
    }

    public Integer getDetailsEchangeId() {
        return detailsEchangeId;
    }

    public void setDetailsEchangeId(Integer detailsEchangeId) {
        this.detailsEchangeId = detailsEchangeId;
    }

    public Echanges getEchangeId() {
        return echangeId;
    }

    public void setEchangeId(Echanges echangeId) {
        this.echangeId = echangeId;
    }

    public Objets getObjetId() {
        return objetId;
    }

    public void setObjetId(Objets objetId) {
        this.objetId = objetId;
    }

    public Utilisateurs getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Utilisateurs utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (detailsEchangeId != null ? detailsEchangeId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof DetailsEchanges)) {
            return false;
        }
        DetailsEchanges other = (DetailsEchanges) object;
        if ((this.detailsEchangeId == null && other.detailsEchangeId != null) || (this.detailsEchangeId != null && !this.detailsEchangeId.equals(other.detailsEchangeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.DetailsEchanges[ detailsEchangeId=" + detailsEchangeId + " ]";
    }
    
}
