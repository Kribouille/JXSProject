package net.jxsproject.ws.service.cloudUnifier;

import org.json.JSONObject;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.Map;

public class DBoxUnifier extends CloudUnifier {

  private String m_clientId = "";
  private String m_clientSecret = "";
  private String m_token = ""; //[PUT TOKEN HERE]

  private static DBoxUnifier instance;

  public static ICloudUnifier getInstance() {
    if (instance == null)
      instance = new DBoxUnifier();

    return instance;
  }

  private DBoxUnifier() {
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

  @Override
  public Response cloudAuthorize(String callbackUri) {

    if (this.m_clientId == null || this.m_clientSecret == null){
      return Response.status(500).entity("Error config").build();
    }
    else {
      String query = String.format("client_id=%s&response_type=%s&redirect_uri=%s", this.m_clientId, "code",callbackUri);
      String url = String.format("https://www.dropbox.com/1/oauth2/authorize?%s", query);
      return Response.status(200).entity(url).build();
    }

  }

  @Override
  public Response authenticate(String code, String callbackUri) {
    if (this.m_clientId == null || this.m_clientSecret == null){
      return Response.status(500).entity("Error config").build();
    }
    else {
      Map<String, String> map = new HashMap<String, String>();
      map.put("code", code);
      map.put("client_id", this.m_clientId);
      map.put("client_secret", this.m_clientSecret);
      map.put("grant_type", "authorization_code");
      map.put("redirect_uri", callbackUri);
      System.out.println(this.m_clientId);
      String res = this.post("https://api.dropboxapi.com/1/oauth2/token", map);
      JSONObject json = new JSONObject(res);
      System.out.println(json);
      this.m_token = (String) json.get("access_token");
      System.out.println(this.m_token);
      System.out.println(this);
      return Response.status(200).entity(json.toString()).build();
    }
  }

  @Override
  public Response getFileDetails(String path) {
    if (this.m_clientId == null || this.m_clientSecret == null){
      return Response.status(500).entity("Error config").build();
    }
    else {
      //map.put("Authorization", "Bearer " + this.m_token);
      System.out.println(this);
      System.out.println(this.m_token);
      String url = String.format("https://api.dropboxapi.com/1/metadata/auto/%s?access_token=%s", path, this.m_token);
      System.out.print(url);
      String res = this.get(url, new HashMap<String, String>());
      JSONObject json = new JSONObject(res);
      System.out.println(json);
      return Response.status(200).entity(json.toString()).build();
    }
  }

  @Override
  public Response getUserDetails() {
    if (this.m_clientId == null || this.m_clientSecret == null){
      return Response.status(500).entity("Error config").build();
    }
    else {
      System.out.println(this.m_token);
      String url = String.format("https://api.dropboxapi.com/1/account/info?access_token=%s", this.m_token);
      System.out.println(url);
      String res = this.get(url, new HashMap<String, String>());
      JSONObject json = new JSONObject(res);
      return Response.status(200).entity(json.toString()).build();
    }
  }
    @Override
    public Response deleteFile(String path) {
        if (this.m_clientId == null || this.m_clientSecret == null){
            return Response.status(500).entity("Error config").build();
        }
        else {
            String url = String.format("https://api.dropboxapi.com/1/fileops/delete?access_token=%s&root=%s&path=%s", this.m_token, "auto", path);
            String res = this.get(url, new HashMap<String, String>());
            JSONObject json = new JSONObject(res);
            return Response.status(200).entity(json.toString()).build();
        }
    }
}
