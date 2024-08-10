/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package mg.itu.tptmbdsp10.service;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import mg.itu.tptmbdsp10.entity.EchangeObjet;

import java.util.List;
/**
 *
 * @author Dina
 */
public class EchangeService {
    
    @PersistenceContext(unitName = "my_persistence_unit")
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<EchangeObjet> getAllEchanges() {
        return em.createQuery("SELECT e FROM Echange e", EchangeObjet.class).getResultList();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createEchange(EchangeObjet echange) {
        em.persist(echange);
        return Response.status(Response.Status.CREATED).entity(echange).build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEchange(@PathParam("id") Long id, EchangeObjet updatedEchange) {
        EchangeObjet echange = em.find(EchangeObjet.class, id);
        if (echange == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        echange.setStatut(updatedEchange.getStatut());
        em.merge(echange);
        return Response.ok(echange).build();
    }

    @DELETE
    @Path("{id}")
    public Response deleteEchange(@PathParam("id") Long id) {
        EchangeObjet echange = em.find(EchangeObjet.class, id);
        if (echange != null) {
            em.remove(echange);
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
}
