package net.jxsproject.ws.service.cloudUnifier;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Produces;

@Path("cloudUnifier")
public class WSCloudUnifierService {

	private ICloudUnifier dropbox;
	private ICloudUnifier drive;

	public WSCloudUnifierService() {
		this.dropbox = DBoxUnifier.getInstance();
		this.drive = GDriveUnifier.getInstance();
	}

	@GET
	@Path("cloudAuthorize")
	@Produces(MediaType.APPLICATION_JSON)
	public Response cloudAuthorize(@QueryParam("cloud") String cloud, String code, @QueryParam("callbackUri") String callbackUri) {
		System.out.println("CloudAuthorize");
		System.out.println(cloud);
		System.out.println(callbackUri);
		if(cloud.equals("db"))
			return dropbox.cloudAuthorize(callbackUri);
		else if (cloud.equals("drive"))
			return drive.cloudAuthorize(callbackUri);
		else
			return null;
	}

	@GET
	@Path("authenticate")
	@Produces(MediaType.APPLICATION_JSON)
	public Response authenticate(@QueryParam("cloud") String cloud, @QueryParam("code") String code, @QueryParam("callbackUri") String callbackUri) {
		if(cloud.equals("db"))
			return this.dropbox.authenticate(code, callbackUri);
		else if (cloud.equals("drive"))
			return this.drive.authenticate(code, callbackUri);
		else
			return null;
	}

	@GET
	@Path("getFDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getFileDetails(@QueryParam("cloud") String cloud, @QueryParam("path") String path) {
		if(cloud.equals("db"))
			return this.dropbox.getFileDetails(path);
		else if (cloud.equals("drive"))
			return this.drive.getFileDetails(path);
		else
			return null;
	}

	@GET
	@Path("getUDetails")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserDetails(@QueryParam("cloud") String cloud) {
		if(cloud.equals("db"))
			return this.dropbox.getUserDetails();
		else if (cloud.equals("drive"))
			return this.drive.getUserDetails();
		else
			return null;
	}

	@GET
	@Path("deleteFile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteFile(@QueryParam("cloud") String cloud, @QueryParam("path") String path) {
		if(cloud.equals("db"))
			return this.dropbox.deleteFile(path);
		else if (cloud.equals("drive"))
			return this.drive.deleteFile(path);
		else
			return null;
	}

	@GET
	@Path("moveFile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response moveFile(@QueryParam("cloud") String cloud, @QueryParam("pathFrom") String pathFrom, @QueryParam("pathTo") String pathTo) {
		if(cloud.equals("db"))
			return this.dropbox.moveFile(pathFrom, pathTo);
		else if (cloud.equals("drive"))
			return this.drive.moveFile(pathFrom, pathTo);
		else
			return null;
	}

	@GET
	@Path("addFile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addFile(@QueryParam("cloud") String cloud, @QueryParam("pathFrom") String pathFrom, @QueryParam("pathTo") String pathTo) {
		if(cloud.equals("db"))
			return this.dropbox.addFile(pathFrom, pathTo);
		else if (cloud.equals("drive"))
			return this.drive.addFile(pathFrom, pathTo);
		else
			return null;
	}

}