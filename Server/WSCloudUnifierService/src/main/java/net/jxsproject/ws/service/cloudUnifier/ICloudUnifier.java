package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.core.Response;

public interface ICloudUnifier {

  Response cloudAuthorize(String callbackUri);

  Response authenticate(String code, String callbackUri);

  Response getFileDetails(String f);

  Response getUserDetails();

  Response deleteFile(String file);

  Response moveFile(String pathFrom, String pathTo);

  Response addFile(String pathFrom, String pathTo);
/*
  public Response move(File f, Dir d);

  public Response share(File f, Rights r);

  public Response getCloudData();
**/
}