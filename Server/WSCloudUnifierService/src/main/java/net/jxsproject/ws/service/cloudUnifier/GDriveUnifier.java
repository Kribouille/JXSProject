package net.jxsproject.ws.service.cloudUnifier;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.FileEntity;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONObject;
import com.google.common.collect.ImmutableMap;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.net.URI;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
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
      this.callbackUri = (String) config.get("callbackUri");
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
    } else if (this.callbackUri == null) {
      jsonContent.put("err", "incorrect config (callback_url)");
    } else {
      this.callbackUri=callbackUri;
      String url = new StringBuilder(
      "https://accounts.google.com/o/oauth2/v2/auth"
      + "?response_type=code&scope=https://www.googleapis.com/auth/drive&")
      .append("client_id=").append(this.m_clientId)
      .append("&redirect_uri=").append(this.callbackUri)
      .toString();
      jsonContent.put("url", url);
    }

    JSONObject result = new JSONObject(jsonContent);
    return Response.status(200).entity(result.toString()).build();
  }

  @Override
  public Response authenticate(String code) {
    Map<String, String> jsonContent = new HashMap();

    String body = null;
    String accessToken = null;

    try {

      body = this.post("https://www.googleapis.com/oauth2/v4/token",
      ImmutableMap.<String, String>builder()
      .put("code", code)
      .put("client_id", this.m_clientId)
      .put("client_secret", this.m_clientSecret)
      .put("redirect_uri", this.callbackUri)
      .put("grant_type", "authorization_code").build());

      JSONObject obj = new JSONObject(body);
      accessToken = obj.getString("access_token");

      this.m_token = accessToken;
      jsonContent.put("token", accessToken);
    } catch (Exception e) {
      jsonContent.put("err", "Unable to parse json " + body);
      return Response.status(200).entity(jsonContent.toString()).build();
    }


    JSONObject result = new JSONObject(jsonContent);
    try{
      URI uri = new URI("http://localhost:3000/allFiles");
      return Response.seeOther(uri).build();
    }
    catch(Exception e){
      e.printStackTrace();
      return Response.status(500).entity("Error redirection").build();
    }
  }

  @Override
  public Response getFileDetails(String path){
    //this.synchronize();
    Map<String, String> jsonContent = new HashMap();
    String json = null;
    try {
      String url = new StringBuilder("https://www.googleapis.com/drive/v2/files/" + path + "?access_token=").append(this.m_token).toString();
      HttpGet request = new HttpGet(url);
      HttpClient httpclient = HttpClients.createDefault();
      HttpResponse response = httpclient.execute(request);

      HttpEntity entity = response.getEntity();
      json = EntityUtils.toString(entity);
    } catch (Exception e) {
      jsonContent.put("err", "Unable to parse json");
      return Response.status(200).entity(jsonContent.toString()).build();
    }
    return Response.status(200).entity(json.toString()).build();
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

  /*public void synchronize(){
    try {
      JSONObject content = new JSONObject(this.get(
      new StringBuilder("https://www.googleapis.com/drive/v2/files")
      .append("?access_token=").append(this.m_token)
      .append("&spaces=drive")
      .toString()));

      JSONArray items = content.getJSONArray("items");
      this._IdToFile = new HashMap<String, GoogleFile>();
      this._pathToId = new HashMap<String, String>();
      //Build IdToFile
      for (int i = 0; i < items.length(); ++i) {
        JSONObject item = items.getJSONObject(i);
        String id = item.getString("id");
        String title = item.getString("title");
        String link = item.getString("alternateLink");
        List<GoogleFolder> parents = new ArrayList<GoogleFolder>();
        JSONArray parentsArray = item.getJSONArray("parents");
        for (int j = 0; j < parentsArray.length(); ++j) {
          JSONObject parent = parentsArray.getJSONObject(j);
          parents.add(new GoogleFolder(parent.getString("id"),
          parent.getBoolean("isRoot")));
          if (parent.getBoolean("isRoot")) {
            this._pathToId.put("/", parent.getString("id"));
          }
        }
        this._IdToFile.put(id, new GoogleFile(id, title, link, parents));
      }

      //Build pathToId
      for (String key : this._IdToFile.keySet()) {
        GoogleFile gf = this._IdToFile.get(key);
        String finalPath = gf.getTitle();
        String id = gf.getId();
        GoogleFolder parent = gf.getParents().get(0);
        while (!parent.isRoot()) {
          GoogleFile parentFile = this._IdToFile.get(parent.getId());
          finalPath = parentFile.getTitle() + "/" + finalPath;
          parent = parentFile.getParents().get(0);
        }
        this._pathToId.put(finalPath, id);
      }
    } catch (Exception e) {
      e.getMessage();
    }
  }*/

}
