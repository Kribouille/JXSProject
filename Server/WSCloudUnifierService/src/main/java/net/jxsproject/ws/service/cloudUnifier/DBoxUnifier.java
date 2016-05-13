package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Response;
import org.json.*;
import java.util.Map;
import java.util.HashMap;
import java.lang.Exception;

//Path param
//String redirect_uriS = "http://localhost:8080/WSCloudUnifierService/DBoxUnifier";

@Path("/DBoxUnifier")
public class DBoxUnifier extends CloudUnifier {

  private String m_clientId = ""; //[PUT KEY HERE]
  private String m_clientSecret = ""; //[PUT SECRET HERE]
  private String m_token = ""; //[PUT TOKEN HERE]

  public DBoxUnifier() {
    //TODO : Récupérer ClientId et ClientSecret depuis un fichier local de config
  }

  @GET
  @Path("cloudAuthorize")
  @Override
  public Response cloudAuthorize(@QueryParam("callbackUri") String callbackUri) {
    Map<String, String> res = new HashMap<String, String>();
    String output = "";

    try{
      //Create connection
      //Authorize API connection
      String query = String.format("client_id=%s&response_type=%s&redirect_uri=%s", this.m_clientId, "code",callbackUri);
      String url = String.format("https://www.dropbox.com/1/oauth2/authorize?%s", query);

      output = this.get(url);

      JSONObject obj = new JSONObject(output);
      this.m_token = obj.getString("access_token");

      res.put("token", this.m_token);
    }
    catch(Exception e){
      e.printStackTrace();
      return Response.status(500).entity(output).build();
    }

    JSONObject result = new JSONObject(res);
    return Response.status(200).entity(res.toString()).build();
  }

  @GET
  @Path("authenticate")
  @Override
  public Response authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
    return null;
  }
}
