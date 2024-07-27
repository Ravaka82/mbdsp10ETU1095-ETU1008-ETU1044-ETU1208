package org.apache.maven.backend_jakartaee_api_rest.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.apache.maven.backend_jakartaee_api_rest.entity.ObjectTest;
import org.apache.maven.backend_jakartaee_api_rest.service.objectTestManager;

/**
 *
 * @author ASPIRE
 */
@Path("objecttest")
public class ObjectTestResource {
//    private List<ObjectTest> objList;
    
    @Inject  
    private objectTestManager objManager;

    @GET
    @Path("hello")
    public String sayHello(){
        return "Hello world!";
    }
    
//    @GET
//    @Path("all")
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getAllObjects() {
//        List<ObjectTest> objects = objManager.getAllObjects();
//        return Response.ok(objects).build();
//    }
}
