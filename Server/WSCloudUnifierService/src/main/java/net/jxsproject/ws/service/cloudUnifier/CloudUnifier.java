package net.jxsproject.ws.service.cloudUnifier;

import org.apache.http.client.ClientProtocolException;
import java.io.IOException;
import java.util.Map;
import java.util.HashMap;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.FileReader;
import java.io.PrintWriter;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.Header;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.NameValuePair;
import java.util.ArrayList;
import java.util.List;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.util.EntityUtils;
import org.apache.http.entity.StringEntity;
import java.text.ParseException;
import org.json.JSONObject;
import javax.ws.rs.core.Response;

public abstract class CloudUnifier implements ICloudUnifier{

  protected String readF(String path) {
    try {
      BufferedReader br = new BufferedReader(new FileReader(path));
      StringBuilder sb = new StringBuilder();

      String line = br.readLine();
      while (line != null) {
        sb.append(line);
        sb.append(System.lineSeparator());
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
      for (String key : m.keySet()) {
        if (!httpget.containsHeader(key)) {
          httpget.addHeader(key, m.get(key));
        }
      }
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
}
