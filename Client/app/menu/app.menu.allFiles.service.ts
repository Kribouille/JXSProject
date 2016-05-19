import {Observable} from 'rxjs/Observable';
import {Component, enableProdMode, Injectable, OnInit} from '@angular/core';
import {Http, Headers, HTTP_PROVIDERS, URLSearchParams, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class AllFilesService{
  constructor(private http:Http){
  }

  private _filesUrls = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path=/';

  getFiles(){
    return this.http.get(this._filesUrls)
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  private handleError(err : Response){
    console.error(err);
    return Observable.throw(err.json().error || 'Server error');
  }

}
