package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;

@Path("/GDriveUnifier")
public class GDriveUnifier implements ICloudUnifier {


    @GET
    @Path("cloudAuthorize")
    @Override
    public Response cloudAuthorize(@QueryParam("callbackUri") String callbackUri) {
      return null;
    }

    @GET
    @Path("authenticate")
    @Override
    public Response authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
      return null;
    }

}
