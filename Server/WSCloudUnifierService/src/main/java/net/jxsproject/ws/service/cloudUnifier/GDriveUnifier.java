package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.QueryParam;
import javax.ws.rs.FormParam;
import java.io.FileReader;
import org.json.JSONArray;
import org.json.JSONObject;

public class GDriveUnifier extends CloudUnifier {

  private String m_clientId = "";
  private String m_clientSecret = "";
  private String m_token = ""; //[PUT TOKEN HERE]

  private static GDriveUnifier instance;

  public static ICloudUnifier getInstance() {
    if (instance == null)
      instance = new GDriveUnifier();

    return instance;
  }

  private GDriveUnifier() {
    try {
      JSONObject config = new JSONObject(this.readF("./gDriveConfig.json"));

      this.m_clientId = (String) config.get("client_id");
      this.m_clientSecret = (String) config.get("client_secret");
    } catch (Exception e) {
      e.printStackTrace();
      this.m_clientId = null;
      this.m_clientSecret = null;
    }
  }

  @Override
  public Response cloudAuthorize(String callbackUri) {
    return null;
  }

  @Override
  public Response authenticate(String code, String callbackUri) {
    return null;
  }

  @Override
  public Response getFileDetails(String path){
    return null;
  }

  @Override
  public Response getUserDetails() {return null; }
}
