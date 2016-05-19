import {Component} from '@angular/core';
import {Http, Headers} from 'angular2/http';
import {FileExplorer} from '../explorer/app.explorer.fileExplorer.component';

@Component({
  selector:"all-files",
  template:`
  <div>
  <h3>All files on your drive</h3>
  <p>Firest file, etc</p>
  </div>
  <file-explorer></file-explorer>
  `,
  directives: [FileExplorer]
})
export class AllFilesComponent{

}
