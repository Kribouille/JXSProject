import {Component} from '@angular/core';
import {MyFile} from './my_file';
import {FileExplorerService} from './app.explorer.fileExplorer.service';

@Component({
  selector:'file-explorer',
  providers: [FileExplorerService],
  template:`
  <div class="explorer" style ="border-style : solid ;" >

    <ul>
      <li *ngFor="let f of files">
        <strong>{{f.title}}</strong> <br><br>
        <div class="file_content">{{f.contentFile}}</div>
      </li>
    </ul>
  </div>
  `
})
export class FileExplorer{
  files : MyFile[];
  errString : String;

  constructor(private _fileService : FileExplorerService){

  }

  ngOnInit(){//appelée après le constructor
    this.getFiles();
  }


  getFiles(){
    return this._fileService.getFiles()//observable
                            .subscribe(
                              data => { this.files = data},
                              err => console.error(err), () => console.log('done')
                            );

  }



}
