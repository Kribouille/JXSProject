package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import javax.ws.rs.core.Response;
import java.util.Map;
import java.util.HashMap;
import java.lang.Exception;
import java.io.FileReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Path("/DBoxUnifier")
public class DBoxUnifier extends CloudUnifier {

  private String m_clientId = "";
  private String m_clientSecret = "";
  private String m_token = ""; //[PUT TOKEN HERE]
  //private String redirect_uriS = "http://localhost:8080/WSCloudUnifierService/DBoxUnifier";

  public DBoxUnifier() {
    try {
      JSONParser parser = new JSONParser();
      Object obj = parser.parse(new FileReader("./dBoxConfig.json"));

      JSONObject config = (JSONObject) obj;

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
  @Override
  public Response authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
    /*JSONParser parser = new JSONParser();
    Object tmp = parser.parse("{" + output + "}");
    JSONObject obj = (JSONObject) tmp;
    this.m_token = (String) obj.get("access_token");
    System.out.println(this.m_token);
    res.put("token", this.m_token);*/
    return null;
  }
}
