/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package org.apache.maven.backend_jakartaee_api_rest.service;

import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import org.apache.maven.backend_jakartaee_api_rest.entity.ObjectTest;

/**
 *
 * @author ASPIRE
 */
@RequestScoped
public class objectTestManager {
    @PersistenceContext(unitName = "echangePU")
    private EntityManager em;
    
    public List<ObjectTest> getAllObjects() {
       Query query = em.createNamedQuery("ObjectTest.findAll");
       return query.getResultList();
    }

    @Transactional
    public ObjectTest update(ObjectTest object) {
       return em.merge(object);
    }

    @Transactional
    public void persist(ObjectTest object) {
       em.persist(object);
    }

}
