import {MyFile} from './my_file';
import {Observable} from 'rxjs/Observable';
import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class FileExplorerService{
  constructor(private http:Http){
  }

  private _filesUrls = 'app/testGetFiles.json';

  getFiles(){
    return this.http.get(this._filesUrls)
                    .map(res => <MyFile[]> res.json())
                    .catch(this.handleError);
  }

  private handleError(err : Response){
    console.error(err);
    return Observable.throw(err.json().error || 'Server error');
  }



  /*
    addFile (name: string, date:Date ,content:string): Observable<MyFile> {
      let body = JSON.stringify({ name,date,content });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this._filesUrls, body, options)
                      .map(this.extractData)
                      .catch(this.handleError);
    }
  */

}
