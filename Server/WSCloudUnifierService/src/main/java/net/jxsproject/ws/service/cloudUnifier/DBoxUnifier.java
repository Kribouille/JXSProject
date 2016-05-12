package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.net.*;
import java.io.*;
import java.lang.Exception;

@Path("/DBoxUnifier")
public class DBoxUnifier implements ICloudUnifier {

  @GET
  @Override
  public Response test(String i) {
    String output = "";
    try{
      URLConnection connection = null;
      //Create connection
      String charset = "UTF-8";
      String client_idS = ""; // PUT KEY HERE !!!
      String response_typeS ="code";
      String redirect_uriS = "http://localhost:8080/WSCloudUnifierService/DBoxUnifier";
      String query = String.format("client_id=%s&response_type=%s&redirect_uri=%s",
      client_idS,response_typeS,redirect_uriS);
      System.out.println(query);
      URL url = new URL("https://www.dropbox.com/1/oauth2/authorize" + "?" + query);
      //connection.setRequestProperty("Accept-Charset", charset);
      connection = (URLConnection)url.openConnection();
      BufferedReader in = new BufferedReader(
      new InputStreamReader(
      connection.getInputStream()));
      String inputLine = "";

      while ((inputLine = in.readLine()) != null)
      output+=inputLine;
      in.close();
    }
    catch(Exception e){
      e.printStackTrace();
    }
    return Response.status(200).entity(output).build();
  }

}
