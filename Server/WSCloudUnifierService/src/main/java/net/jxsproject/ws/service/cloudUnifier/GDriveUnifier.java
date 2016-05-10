package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/GDriveUnifier")
public class GDriveUnifier implements ICloudUnifier {

  @GET
  @Path("/{i}")
  @Override
  public Response test(@PathParam("i") String i) {

    int output = Integer.parseInt(i) + 2;

    return Response.status(200).entity(Integer.toString(output)).build();
  }

}
