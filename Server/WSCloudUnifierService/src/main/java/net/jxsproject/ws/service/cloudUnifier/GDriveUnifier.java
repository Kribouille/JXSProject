package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import java.io.FileReader;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

@Path("/GDriveUnifier")
public class GDriveUnifier implements ICloudUnifier {

  private String m_clientId = "";
  private String m_clientSecret = "";
  private String m_token = ""; //[PUT TOKEN HERE]

  public GDriveUnifier() {
    try {
      JSONParser parser = new JSONParser();
      Object obj = parser.parse(new FileReader("./gDriveConfig.json"));

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
    return null;
  }

  @GET
  @Path("authenticate")
  @Override
  public JSONObject authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
    return null;
  }

  @GET
  @Path("getFileDetails")
  @Override
  public JSONObject getFileDetails(String f){
    
  }
}
