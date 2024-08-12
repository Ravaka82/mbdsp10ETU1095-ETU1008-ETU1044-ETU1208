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
import java.util.Date;
import mg.itu.tptmbdsp10.entity.EchangeObjet;

import java.util.List;
/**
 *
 * @author Dina
 */
@Stateless
@Path("/echanges")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EchangeService {
    
    @PersistenceContext(unitName = "swapsavvyPU")
    private EntityManager em;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<EchangeObjet> getAllEchanges() {
        return em.createQuery("SELECT e FROM EchangeObjet e", EchangeObjet.class).getResultList();
    }

    @POST
    @Path("/proposer")
    public Response createEchange(EchangeObjet echange) {
        echange.setStatut("En attente");
        echange.setDateProposition(new Date());
        em.persist(echange);
        return Response.status(Response.Status.CREATED).entity(echange).build();
    }

    @PUT
    @Path("{id}")
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
            echange.setStatut("Supprimé");
            em.remove(echange);
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    
    @GET
    @Path("/{id}")
    public Response getEchange(@PathParam("id") Long id) {
        EchangeObjet echange = em.find(EchangeObjet.class, id);
        if (echange == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(echange).build();
    }
    
    @PUT
    @Path("/{id}/accepter")
    public Response accepterEchange(@PathParam("id") Long id) {
        EchangeObjet echange = em.find(EchangeObjet.class, id);
        if (echange == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        echange.setStatut("Accepté");
        em.merge(echange);
        return Response.ok(echange).build();
    }
    
    @PUT
    @Path("/{id}/refuser")
    public Response refuserEchange(@PathParam("id") Long id) {
        EchangeObjet echange = em.find(EchangeObjet.class, id);
        if (echange == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        echange.setStatut("Refusé");
        em.merge(echange);
        return Response.ok(echange).build();
    }
    
}
