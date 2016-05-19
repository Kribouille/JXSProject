package net.jxsproject.ws.service.cloudUnifier;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.FileEntity;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class GDriveUnifier extends CloudUnifier {

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
      this.m_callbackUri = (String) config.get("callbackUri");
    } catch (Exception e) {
      e.printStackTrace();
      this.m_clientId = null;
      this.m_clientSecret = null;
    }
  }

  @Override
  public Response cloudAuthorize(String callbackUri) {
   Map<String, String> jsonContent = new HashMap();

      if (this.m_clientId == null) {
        jsonContent.put("err", "incorrect config (app_key)");
      } else if (this.m_clientSecret == null) {
        jsonContent.put("err", "incorrect config (app_secret)");
      } else if (_callbackUrl == null) {
        jsonContent.put("err", "incorrect config (callback_url)");
      } else {
        String url = new StringBuilder(
        "https://accounts.google.com/o/oauth2/v2/auth"
        + "?response_type=code&scope=https://www.googleapis.com/auth/drive&")
        .append("client_id=").append(this.m_clientId)
        .append("&redirect_uri=").append(this.m_callbackUri)
        .toString();
        jsonContent.put("url", url);
      }

      JSONObject result = new JSONObject(jsonContent);
      return Response.status(200).entity(result.toString()).build();
  }

  @Override
  public Response authenticate(String code) {
    return null;
  }

  @Override
  public Response getFileDetails(String path){
    return null;
  }

  @Override
  public Response getUserDetails() {return null; }

  @Override
  public Response deleteFile(String file) { return null;}

  @Override
  public Response moveFile(final String pathFrom, final String pathTo) {return null;}

  @Override
  public Response addFile(final String pathFrom, final String pathTo) {return null;}

  @Override
  public Response getTree(final String path) {return null;}

  @Override
  public Response isConnected() {return null;}

  @Override
  public Response share(final String path) {return null;}

}
