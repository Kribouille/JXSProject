package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.HashMap;
import java.lang.Exception;
import java.io.FileReader;
import org.json.JSONArray;
import org.json.JSONObject;

@Path("/DBoxUnifier")
public class DBoxUnifier extends CloudUnifier {

  private String m_clientId = "";
  private String m_clientSecret = "";
  private String m_token = ""; //[PUT TOKEN HERE]
  //private String redirect_uriS = "http://localhost:8080/WSCloudUnifierService/DBoxUnifier";

  public DBoxUnifier() {
    try {
      JSONObject config = new JSONObject(this.readF("./dBoxConfig.json"));

      this.m_clientId = (String) config.get("client_id");
      this.m_clientSecret = (String) config.get("client_secret");
    } catch (Exception e) {
      e.printStackTrace();
      this.m_clientId = null;
      this.m_clientSecret = null;
    }
  }

  @GET
  @Path("cloudAuthorize")
  @Override
  public Response cloudAuthorize(@QueryParam("callbackUri") String callbackUri) {

    if (this.m_clientId == null || this.m_clientSecret == null){
      return Response.status(500).entity("Error config").build();
    }
    else {
      String query = String.format("client_id=%s&response_type=%s&redirect_uri=%s", this.m_clientId, "code",callbackUri);
      String url = String.format("https://www.dropbox.com/1/oauth2/authorize?%s", query);
      return Response.status(200).entity(url).build();
    }

  }

  @GET
  @Path("authenticate")
  @Produces(MediaType.APPLICATION_JSON)
  @Override
  public Response authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
    Map<String,String> map= new HashMap<String, String>();
    map.put("code", code);
    map.put("client_id", this.m_clientId);
    map.put("client_secret", this.m_clientSecret);
    map.put("grant_type", "authorization_code");
    map.put("redirect_uri",callbackUri);
    System.out.println(this.m_clientId);
    String res = this.post("https://api.dropboxapi.com/1/oauth2/token", map);
    JSONObject json = new JSONObject(res);
    System.out.println(json);
    this.m_token = json.getString("access_token");
    return Response.status(200).entity(json.toString()).build();
  }

  @GET
  @Path("getFileDetails")
  @Produces(MediaType.APPLICATION_JSON)
  @Override
  public Response getFileDetails(@QueryParam("path") String path) {
    Map<String, String> map = new HashMap();
    String aut = "Bearer " + this.m_token;
    map.put("Authorization", aut);
    //map.put("Authorization", "Bearer " + this.m_token);
    String url = String.format("https://api.dropboxapi.com/1/metadata/auto/%s", path);
    String res = this.get(url, map);
    JSONObject json = new JSONObject(res);
    System.out.println(json);
    return Response.status(200).entity(json.toString()).build();
  }
}
