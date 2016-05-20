package net.jxsproject.ws.service.cloudUnifier;
import java.util.List;

public class GFile {
  private String id;
  private String title;
  private GFolder parent;
  public GFile(String id, String title, GFolder parent){
    this.id = id;
    this.title = title;
    this.parent = parent;
  }

  public String getTitle(){
    return this.title;
  }
  public String getId(){
    return this.id;
  }
  public GFolder getParent(){
    return this.parent;
  }
}
