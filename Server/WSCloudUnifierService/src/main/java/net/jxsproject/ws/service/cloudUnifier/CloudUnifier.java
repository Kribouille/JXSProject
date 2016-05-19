package net.jxsproject.ws.service.cloudUnifier;

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
import org.apache.http.entity.mime.content.FileBody;
import org.json.JSONObject;

import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public abstract class CloudUnifier implements ICloudUnifier{

  protected String readF(String path) {
    try {
      BufferedReader br = new BufferedReader(new FileReader(path));
      StringBuilder sb = new StringBuilder();

      String line = br.readLine();
      while (line != null) {
        sb.append(line);
        sb.append(System.getProperty("line.separator"));
        line = br.readLine();
      }
      String result = sb.toString();
      return result;
    } catch (Exception e) {
      return "";
    }
  }

  protected String get(String url, Map<String, String> m) {
    try{
      HttpClient httpclient = HttpClients.createDefault();
      HttpGet httpget = new HttpGet(url);
      if(m!=null)
        for (Map.Entry<String, String> e : m.entrySet())
          if (httpget.getAllHeaders().length >= 1) //Header déjà présent, on en ajoute
            httpget.addHeader(e.getKey(), e.getValue());
          else //Pas de header donc on le set
            httpget.setHeader(e.getKey(), e.getValue());

      HttpResponse rep = httpclient.execute(httpget);
      HttpEntity en = rep.getEntity();
      String body = EntityUtils.toString(en);

      return body;
    }
    catch(Exception e){
      e.printStackTrace();
    }
    return null;
  }

  protected String post(String url, Map<String, String> m) {
    try{
      HttpClient httpclient = HttpClients.createDefault();
      HttpPost httppost = new HttpPost(url);

      // Request parameters and other properties.
      List<NameValuePair> params = new ArrayList<NameValuePair>();
      for (Map.Entry<String, String> e : m.entrySet()) {
        params.add(new BasicNameValuePair(e.getKey(), e.getValue()));
      }
      httppost.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
      HttpResponse rep = httpclient.execute(httppost);
      HttpEntity en = rep.getEntity();
      String body = EntityUtils.toString(en);

      return body;
    }
    catch(Exception e){
      e.printStackTrace();
    }
    return null;
  }

  public abstract Response cloudAuthorize(String callbackUri);
  public abstract Response authenticate(String code, String callbackUri);
  public abstract Response getFileDetails(String path);
  public abstract Response getUserDetails();
  public abstract Response deleteFile(String path);
  public abstract Response moveFile(String pathFrom, String pathTo);
  public abstract Response addFile(String pathFrom, String pathTo);
  public abstract Response getTree(String path);
  public abstract Response share(String path);

}
