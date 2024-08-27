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
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Size;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;
import java.util.Date;

/**
 *
 * @author ASPIRE
 */
@Entity
@Table(name = "images_objets")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ImagesObjets.findAll", query = "SELECT i FROM ImagesObjets i"),
    @NamedQuery(name = "ImagesObjets.findByImageId", query = "SELECT i FROM ImagesObjets i WHERE i.imageId = :imageId"),
    @NamedQuery(name = "ImagesObjets.findByFilename", query = "SELECT i FROM ImagesObjets i WHERE i.filename = :filename"),
    @NamedQuery(name = "ImagesObjets.findByDateAjout", query = "SELECT i FROM ImagesObjets i WHERE i.dateAjout = :dateAjout")})
public class ImagesObjets implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "image_id")
    private Integer imageId;
    @Size(max = 2147483647)
    @Column(name = "filename")
    private String filename;
    @Column(name = "date_ajout")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateAjout;
    @JoinColumn(name = "objet_id", referencedColumnName = "objet_id")
    @ManyToOne
    private Objets objetId;

    public ImagesObjets() {
    }

    public ImagesObjets(Integer imageId) {
        this.imageId = imageId;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Date getDateAjout() {
        return dateAjout;
    }

    public void setDateAjout(Date dateAjout) {
        this.dateAjout = dateAjout;
    }

    public Objets getObjetId() {
        return objetId;
    }

    public void setObjetId(Objets objetId) {
        this.objetId = objetId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (imageId != null ? imageId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ImagesObjets)) {
            return false;
        }
        ImagesObjets other = (ImagesObjets) object;
        if ((this.imageId == null && other.imageId != null) || (this.imageId != null && !this.imageId.equals(other.imageId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.ImagesObjets[ imageId=" + imageId + " ]";
    }
    
}
