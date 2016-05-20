package net.jxsproject.ws.service.cloudUnifier;
import java.util.List;
public class GFile {
  private String id;
  private String title;
  private List<GFolder> parents;
  public GFile(String id, String title, List<GFolder> parents){
    this.id = id;
    this.title = title;
    this.parents = parents;
  }

  public String getTitle(){
    return this.title;
  }
  public String getId(){
    return this.id;
  }
  public List<GFolder> getParents(){
    return this.parents;
  }
}
