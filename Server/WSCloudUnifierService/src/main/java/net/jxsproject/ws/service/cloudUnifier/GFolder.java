package net.jxsproject.ws.service.cloudUnifier;
public class GFolder {
  private String id;
  private boolean isRoot;
  public GFolder(String id, boolean isRoot){
    this.id = id;
    this.isRoot = isRoot;
  }

  public String getId(){
    return this.id;
  }
  public boolean getIsRoot(){
    return this.isRoot;
  }
}
