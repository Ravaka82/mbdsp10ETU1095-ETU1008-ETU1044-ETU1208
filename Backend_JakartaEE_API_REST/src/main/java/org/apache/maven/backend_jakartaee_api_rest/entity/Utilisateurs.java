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
@Table(name = "utilisateurs")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Utilisateurs.findAll", query = "SELECT u FROM Utilisateurs u"),
    @NamedQuery(name = "Utilisateurs.findByUtilisateurId", query = "SELECT u FROM Utilisateurs u WHERE u.utilisateurId = :utilisateurId"),
    @NamedQuery(name = "Utilisateurs.findByNom", query = "SELECT u FROM Utilisateurs u WHERE u.nom = :nom"),
    @NamedQuery(name = "Utilisateurs.findByPrenom", query = "SELECT u FROM Utilisateurs u WHERE u.prenom = :prenom"),
    @NamedQuery(name = "Utilisateurs.findByEmail", query = "SELECT u FROM Utilisateurs u WHERE u.email = :email"),
    @NamedQuery(name = "Utilisateurs.findByMotDePasse", query = "SELECT u FROM Utilisateurs u WHERE u.motDePasse = :motDePasse"),
    @NamedQuery(name = "Utilisateurs.findByAdresse", query = "SELECT u FROM Utilisateurs u WHERE u.adresse = :adresse"),
    @NamedQuery(name = "Utilisateurs.findByVille", query = "SELECT u FROM Utilisateurs u WHERE u.ville = :ville"),
    @NamedQuery(name = "Utilisateurs.findByCodePostal", query = "SELECT u FROM Utilisateurs u WHERE u.codePostal = :codePostal"),
    @NamedQuery(name = "Utilisateurs.findByDateCreation", query = "SELECT u FROM Utilisateurs u WHERE u.dateCreation = :dateCreation"),
    @NamedQuery(name = "Utilisateurs.findByDateModification", query = "SELECT u FROM Utilisateurs u WHERE u.dateModification = :dateModification")})
public class Utilisateurs implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "utilisateur_id")
    private Integer utilisateurId;
    @Size(max = 100)
    @Column(name = "nom")
    private String nom;
    @Size(max = 100)
    @Column(name = "prenom")
    private String prenom;
    // @Pattern(regexp="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message="Invalid email")//if the field contains email address consider using this annotation to enforce field validation
    @Size(max = 100)
    @Column(name = "email")
    private String email;
    @Size(max = 2147483647)
    @Column(name = "mot_de_passe")
    private String motDePasse;
    @Size(max = 2147483647)
    @Column(name = "adresse")
    private String adresse;
    @Size(max = 100)
    @Column(name = "ville")
    private String ville;
    @Size(max = 20)
    @Column(name = "code_postal")
    private String codePostal;
    @Column(name = "date_creation")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreation;
    @Column(name = "date_modification")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateModification;
    @OneToMany(mappedBy = "utilisateurId")
    private Collection<DetailsEchanges> detailsEchangesCollection;
    @OneToMany(mappedBy = "utilisateurAcceptantId")
    private Collection<Echanges> echangesCollection;
    @OneToMany(mappedBy = "utilisateurProposantId")
    private Collection<Echanges> echangesCollection1;
    @OneToMany(mappedBy = "utilisateurId")
    private Collection<Objets> objetsCollection;

    public Utilisateurs() {
    }

    public Utilisateurs(Integer utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public Integer getUtilisateurId() {
        return utilisateurId;
    }

    public void setUtilisateurId(Integer utilisateurId) {
        this.utilisateurId = utilisateurId;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
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

    @XmlTransient
    public Collection<DetailsEchanges> getDetailsEchangesCollection() {
        return detailsEchangesCollection;
    }

    public void setDetailsEchangesCollection(Collection<DetailsEchanges> detailsEchangesCollection) {
        this.detailsEchangesCollection = detailsEchangesCollection;
    }

    @XmlTransient
    public Collection<Echanges> getEchangesCollection() {
        return echangesCollection;
    }

    public void setEchangesCollection(Collection<Echanges> echangesCollection) {
        this.echangesCollection = echangesCollection;
    }

    @XmlTransient
    public Collection<Echanges> getEchangesCollection1() {
        return echangesCollection1;
    }

    public void setEchangesCollection1(Collection<Echanges> echangesCollection1) {
        this.echangesCollection1 = echangesCollection1;
    }

    @XmlTransient
    public Collection<Objets> getObjetsCollection() {
        return objetsCollection;
    }

    public void setObjetsCollection(Collection<Objets> objetsCollection) {
        this.objetsCollection = objetsCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (utilisateurId != null ? utilisateurId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Utilisateurs)) {
            return false;
        }
        Utilisateurs other = (Utilisateurs) object;
        if ((this.utilisateurId == null && other.utilisateurId != null) || (this.utilisateurId != null && !this.utilisateurId.equals(other.utilisateurId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.Utilisateurs[ utilisateurId=" + utilisateurId + " ]";
    }
    
}
