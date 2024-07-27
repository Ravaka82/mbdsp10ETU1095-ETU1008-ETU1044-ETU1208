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
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

/**
 *
 * @author ASPIRE
 */
@Entity
@Table(name = "object_test")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ObjectTest.findAll", query = "SELECT o FROM ObjectTest o"),
    @NamedQuery(name = "ObjectTest.findByObjectId", query = "SELECT o FROM ObjectTest o WHERE o.objectId = :objectId"),
    @NamedQuery(name = "ObjectTest.findByName", query = "SELECT o FROM ObjectTest o WHERE o.name = :name"),
    @NamedQuery(name = "ObjectTest.findByReference", query = "SELECT o FROM ObjectTest o WHERE o.reference = :reference")})
public class ObjectTest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "object_id")
    private Integer objectId;
    @Size(max = 100)
    @Column(name = "name")
    private String name;
    @Size(max = 100)
    @Column(name = "reference")
    private String reference;

    public ObjectTest() {
    }

    public ObjectTest(Integer objectId) {
        this.objectId = objectId;
    }

    public Integer getObjectId() {
        return objectId;
    }

    public void setObjectId(Integer objectId) {
        this.objectId = objectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (objectId != null ? objectId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ObjectTest)) {
            return false;
        }
        ObjectTest other = (ObjectTest) object;
        if ((this.objectId == null && other.objectId != null) || (this.objectId != null && !this.objectId.equals(other.objectId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.apache.maven.backend_jakartaee_api_rest.entity.ObjectTest[ objectId=" + objectId + " ]";
    }
    
}
