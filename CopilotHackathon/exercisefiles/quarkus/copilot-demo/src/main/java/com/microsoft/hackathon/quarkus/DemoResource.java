package com.microsoft.hackathon.quarkus;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;

/* 
* The Demo resource should be mapped to the root path.
* 
* Create a GET operation to return the value of a key passed as query parameter in the request. 
* 
* If the key is not passed, return "key not passed".
* If the key is passed, return "hello <key>".
* 
*/
@Path("/")
public class DemoResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello(@QueryParam("key") String key) {
        return key == null ? "key not passed" : "hello " + key;
    }
}








