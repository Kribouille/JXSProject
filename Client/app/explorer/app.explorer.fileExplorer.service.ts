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

}
