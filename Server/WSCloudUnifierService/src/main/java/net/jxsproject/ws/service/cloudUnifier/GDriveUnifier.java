package net.jxsproject.ws.service.cloudUnifier;

import org.json.JSONObject;

import javax.ws.rs.core.Response;

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
    } catch (Exception e) {
      e.printStackTrace();
      this.m_clientId = null;
      this.m_clientSecret = null;
    }
  }

  @Override
  public Response cloudAuthorize(String callbackUri) {
    return null;
  }

  @Override
  public Response authenticate(String code, String callbackUri) {
    return null;
  }

  @Override
  public Response getFileDetails(String path){
    return null;
  }

  @Override
  public Response getUserDetails() {return null; }

  @Override
  public Response deleteFile(String file) { return null;}

  @Override
  public Response moveFile(final String pathFrom, final String pathTo) {return null;}

  @Override
  public Response addFile(final String pathFrom, final String pathTo) {return null;}

  @Override
  public Response getTree(final String path) {return null;}

  @Override
  public Response isConnected() {return null;}

  @Override
  public Response share(final String path) {return null;}

}
