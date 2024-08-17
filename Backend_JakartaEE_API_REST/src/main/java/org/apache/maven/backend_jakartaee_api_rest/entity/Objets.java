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
@Table(name = "objets")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Objets.findAll", query = "SELECT o FROM Objets o"),
    @NamedQuery(name = "Objets.findByObjetId", query = "SELECT o FROM Objets o WHERE o.objetId = :objetId"),
    @NamedQuery(name = "Objets.findByTitre", query = "SELECT o FROM Objets o WHERE o.titre = :titre"),
    @NamedQuery(name = "Objets.findByDescription", query = "SELECT o FROM Objets o WHERE o.description = :description"),
    @NamedQuery(name = "Objets.findByDateCreation", query = "SELECT o FROM Objets o WHERE o.dateCreation = :dateCreation"),
    @NamedQuery(name = "Objets.findByDateModification", query = "SELECT o FROM Objets o WHERE o.dateModification = :dateModification"),
    @NamedQuery(name = "Objets.findByStatut", query = "SELECT o FROM Objets o WHERE o.statut = :statut")})
public class Objets implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "objet_id")
    private Integer objetId;
    @Size(max = 255)
    @Column(name = "titre")
    private String titre;
    @Size(max = 2147483647)
    @Column(name = "description")
    private String description;
    @Column(name = "date_creation")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreation;
    @Column(name = "date_modification")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateModification;
    @Size(max = 50)
    @Column(name = "statut")
    private String statut;
    @OneToMany(mappedBy = "objetId")
    private Collection<DetailsEchanges> detailsEchangesCollection;
    @OneToMany(mappedBy = "objetId")
    private Collection<ImagesObjets> imagesObjetsCollection;
    @JoinColumn(name = "categorie_id", referencedColumnName = "categorie_id")
    @ManyToOne
    private Categories categorieId;
    @JoinColumn(name = "utilisateur_id", referencedColumnName = "utilisateur_id")
    @ManyToOne
    private Utilisateurs utilisateurId;

    public Objets() {
    }

    public Objets(Integer objetId) {
        this.objetId = objetId;
    }

    public Integer getObjetId() {
        return objetId;
    }

    public void setObjetId(Integer objetId) {
        this.objetId = objetId;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Date getDateModification() {
        return dateModification;
    }

    public void setDateModification(Date dateModification) {
        this.dateModification = dateModification;
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

    @XmlTransient
    public Collection<ImagesObjets> getImagesObjetsCollection() {
        return imagesObjetsCollection;
    }

    public void setImagesObjetsCollection(Collection<ImagesObjets> imagesObjetsCollection) {
        this.imagesObjetsCollection = imagesObjetsCollection;
    }

    public Categories getCategorieId() {
        return categorieId;
    }

    public void setCategorieId(Categories categorieId) {
        this.categorieId = categorieId;
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
        hash += (objetId != null ? objetId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Objets)) {
            return false;
        }
        Objets other = (Objets) object;
        if ((this.objetId == null && other.objetId != null) || (this.objetId != null && !this.objetId.equals(other.objetId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.Objets[ objetId=" + objetId + " ]";
    }
    
}
