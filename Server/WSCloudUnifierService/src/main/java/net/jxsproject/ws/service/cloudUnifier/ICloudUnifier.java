package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.core.Response;
import org.json.JSONObject;

public interface ICloudUnifier {

  public Response cloudAuthorize(String callbackUri);

  public Response authenticate(String code, String callbackUri);

  public JSONObject getFileDetails(String f);
/**
  public Response rename(File f);

  public Response delete(File f);

  public Response add(File f);

  public Response move(File f, Dir d);

  public Response share(File f, Rights r);

  public Response getCloudData();
**/
}
