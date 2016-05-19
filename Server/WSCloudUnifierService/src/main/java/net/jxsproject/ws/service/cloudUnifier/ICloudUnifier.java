package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.core.Response;

public interface ICloudUnifier {

  public Response cloudAuthorize(String callbackUri);

  public Response authenticate(String code);

  public Response getFileDetails(String f);

  public Response getUserDetails();

  public Response deleteFile(String file);

  public Response moveFile(String pathFrom, String pathTo);

  public Response addFile(String pathFrom, String pathTo);

  public Response getTree(String path);

  public Response isConnected();

  public Response share(String path);

  public Response download(String path);
/*
  public Response move(File f, Dir d);



  public Response getCloudData();
**/
}
