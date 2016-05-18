package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.core.Response;

public interface ICloudUnifier {

  public Response cloudAuthorize(String callbackUri);

  public Response authenticate(String code, String callbackUri);

  public Response getFileDetails(String f);

  public Response getUserDetails();

  public Response deleteFile(String file);

  /*
  public Response add(File f);

  public Response move(File f, Dir d);

  public Response share(File f, Rights r);

  public Response getCloudData();
**/
}
