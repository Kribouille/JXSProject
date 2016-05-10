package net.jxsproject.ws.service.cloudUnifier;

import javax.jws.WebParam;
import javax.jws.WebService;

@WebService(endpointInterface = "net.jxsproject.ws.service.cloudUnifier.ICloudUnifier", serviceName = "DBoxUnifier")
public class DBoxUnifier {

  public int test(@WebParam(name = "i") int i) {
    return (i + 4);
  }

}
