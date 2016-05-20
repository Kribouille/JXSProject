package net.jxsproject.ws.service.cloudUnifier;

import com.google.common.collect.ImmutableMap;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.json.JSONArray;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

public class GDriveUnifier extends CloudUnifier {

  private static GDriveUnifier instance;

  public static ICloudUnifier getInstance() {
    if (instance == null)
    instance = new GDriveUnifier();

    return instance;
  }

    private GDriveUnifier() {
        super("./gDriveConfig.json");
    }

  @Override
  public Response cloudAuthorize(String callbackUri) {
    Map<String, String> jsonContent = new HashMap();

    if (isBadConfig()) {
      return Response.status(500).entity("Error config").build();
    } else {
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

    String accessToken = null;

    try {
      Map<String, String> m = new HashMap<String, String>();
      m.put("code", code);
      m.put("client_id", this.m_clientId);
      m.put("client_secret", this.m_clientSecret);
      m.put("redirect_uri", this.callbackUri);
      m.put("grant_type", "authorization_code");

      String body = this.post("https://www.googleapis.com/oauth2/v4/token", m);

      JSONObject obj = new JSONObject(body);

      this.m_token = obj.getString("access_token");
      jsonContent.put("token", accessToken);
    } catch (Exception e) {
      jsonContent.put("err", "Unable to parse json " + e.toString());
      return Response.status(200).entity(jsonContent.toString()).build();
    }

    JSONObject result = new JSONObject(jsonContent);
    try {
      URI uri = new URI("http://localhost:3000/allFiles");
      return Response.seeOther(uri).build();
    } catch (Exception e) {
      e.printStackTrace();
      return Response.status(500).entity("Error redirection").build();
    }
  }

  @Override
  public Response getFileDetails(String path) {
    this.synchronize();
    Map<String, String> jsonContent = new HashMap();
    String json = null;
    try {
      String id = this.paths.get(path);
      String url = new StringBuilder("https://www.googleapis.com/drive/v2/files/" + id + "?access_token=").append(this.m_token).toString();
      //System.out.println(id);
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
  public Response getUserDetails() {
    try {
      String url = String.format("https://www.googleapis.com/drive/v2/about?access_token=%s", this.m_token);
      String res = this.get(url, new HashMap<String, String>());

      JSONObject json = new JSONObject(res);
      return Response.status(200).entity(json.toString()).build();
    } catch (Exception e) {
      JSONObject err = new JSONObject();
      err.put("err", e.toString());
      return Response.status(500).entity(err).build();
    }
  }


  @Override
  public Response deleteFile(String file) {
    return null;
  }

  @Override
  public Response moveFile(final String pathFrom, final String pathTo) {
    return null;
  }

  @Override
  public Response addFile(final String pathFrom, final String pathTo) {
    return null;
  }


  @Override
  public Response getTree(final String path) {
    this.synchronize();
    List<GFile> tmpL = new ArrayList<GFile>();

    for (Map.Entry<String, String> e : this.paths.entrySet()) {
      System.out.println(e.getKey());
      if (e.getKey().contains(path)) {
        String tmp = e.getValue().substring(e.getKey().indexOf(path));
        int index = tmp.indexOf("/");
        if (index != -1)
          tmp = tmp.substring(0, tmp.indexOf("/"));
        
        if (!tmp.equals("path"))
          tmpL.add(this.files.get(tmp));
      }
    }

    System.out.println(tmpL);
    JSONArray tab = new JSONArray();
    tab.put(tmpL);

        System.out.println(tab);
    JSONObject json = new JSONObject();
    json.put("res", tab);
    return Response.status(200).entity(json.toString()).build();
  }

  @Override
  public Response isConnected() {
    JSONObject res = new JSONObject();
    if(!m_token.equals("")){
      res.put("isConnected", "true");
    }
    else{
      res.put("isConnected", "false");
    }
    return Response.status(200).entity(res.toString()).build();
  }

  @Override
  public Response share(final String path) {
    return null;
  }

  @Override
  public Response download(String path) {
    return null;
  }

  public void synchronize(){
    try {
      JSONObject content = new JSONObject(this.get(
      new StringBuilder("https://www.googleapis.com/drive/v2/files")
      .append("?access_token=").append(this.m_token)
      .append("&spaces=drive")
      .toString(), new HashMap<String,String>()));

      JSONArray items = content.getJSONArray("items");
      this.files = new HashMap<String, GFile>();
      this.paths = new HashMap<String, String>();
      //Build files
      for (int i = 0; i < items.length(); ++i) {
        JSONObject item = items.getJSONObject(i);
        String id = item.getString("id");
        String title = item.getString("title");
        //String link = item.getString("alternateLink");
        JSONArray parents = item.getJSONArray("parents");
        JSONObject parent = null;
        if(parents.length()!=0){
          for (int j = 0; j < parents.length(); ++j) {
            parent = parents.getJSONObject(j);
            if (parent.getBoolean("isRoot")) {
              this.paths.put("/", parent.getString("id"));
            }
          }
        }
        else {
          parent = new JSONObject();
          parent.put("id", this.paths.get("/"));
          parent.put("isRoot", "true");
        }
        this.files.put(id, new GFile(id, title, new GFolder(parent.getString("id"), parent.getBoolean("isRoot"))));
      }

      //Build pathToId
      System.out.println(files.size());
      for (String key : this.files.keySet()) {

        GFile gf = this.files.get(key);
        String finalPath = gf.getTitle();
        String id = gf.getId();
        GFolder parent = gf.getParent();
        while (!parent.getIsRoot()) {
          GFile parentFile = this.files.get(parent.getId());
          finalPath = parentFile.getTitle() + "/" + finalPath;
          parent = parentFile.getParent();
        }
        this.paths.put(finalPath, id);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

}
