package net.jxsproject.ws.service.cloudUnifier;

import com.google.common.collect.ImmutableMap;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import javax.ws.rs.core.Response;
import java.net.URI;
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
            this.callbackUri = (String) config.get("callbackUri");
        } catch (Exception e) {
            e.printStackTrace();
            this.m_clientId = null;
            this.m_clientSecret = null;
            this.callbackUri = null;
        }
    }

    @Override
    public Response cloudAuthorize(String callbackUri) {
        Map<String, String> jsonContent = new HashMap();

        if (isBadConfig()) {
            return Response.status(500).entity("Error config").build();
        } else {
            this.callbackUri = callbackUri;
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
    public Response getUserDetails() {
        return null;
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
        return null;
    }

    @Override
    public Response isConnected() {
        return null;
    }

    @Override
    public Response share(final String path) {
        return null;
    }

    @Override
    public Response download(String path) {
        return null;
    }

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
