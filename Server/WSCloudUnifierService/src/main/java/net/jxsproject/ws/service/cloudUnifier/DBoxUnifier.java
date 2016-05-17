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
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.impl.client.HttpClients;

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
  public JSONObject authenticate(@QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
    try{
      Map<String,String> map= new HashMap<String, String>();
      map.put("code", code);
      map.put("client_id", this.m_clientId);
      map.put("client_secret", this.m_clientSecret);
      map.put("grant_type", "authorization_code");
      map.put("redirect_uri",callbackUri);

      String res = this.post("https://api.dropboxapi.com/1/oauth2/token", map);
      JSONParser parser = new JSONParser();
      JSONObject json = (JSONObject) parser.parse(res);
      this.m_token = (String) json.get("access_token");
      json.clear();
      json.put("token", this.m_token);
      return json;
    }
    catch(Exception e){
      e.printStackTrace();
      return null;
    }
  }

  @GET
  @Path("getFileDetails")
  @Override
  public JSONObject getFileDetails(String f){
    JSONObject result = null;
    try {
      String query = String.format("?access_token=%s", this.m_token);
      String url = String.format("https://content.dropboxapi.com/1/files/auto/%s%s", f, query);
      HttpGet request = new HttpGet(url);
      HttpClient httpClient = HttpClients.createDefault();
      HttpResponse response = httpClient.execute(request);

      HttpEntity entity = response.getEntity();
      String downloadUrl = this.shareFile(f).getString("url");

      result = new JSONObject(response.getFirstHeader("x-dropbox-metadata")
      .getValue());
      result.put("download_url", downloadUrl);
    } catch (Exception e) {
      Map<String, String> jsonContent = new HashMap();
      jsonContent.put("err", "Unable to parse json");
      return new JSONObject(jsonContent);
    }
    return result;
  }

  public JSONObject shareFile(final String file) {
    String res = null;
    JSONParser parser = new JSONParser();
    try {
      res = this.get(
      new StringBuilder("https://api.dropboxapi.com/1/shares/auto/")
      .append(file)
      .append("?access_token=").append(_token)
      .toString());
    } catch (Exception e) {
      JSONObject json = (JSONObject) parser.parse(res);
      return json;
    }
    JSONObject json = (JSONObject) parser.parse(res);
    return new JSONObject(json);
  }
}
