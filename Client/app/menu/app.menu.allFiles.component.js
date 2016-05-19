System.register(['@angular/core', '@angular/common', '@angular/http', '@angular/router', './app.menu.allFiles.service', '../explorer/app.explorer.fileExplorer.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_1, router_1, app_menu_allFiles_service_1, app_explorer_fileExplorer_component_1;
    var AllFilesComponent, Folder;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_menu_allFiles_service_1_1) {
                app_menu_allFiles_service_1 = app_menu_allFiles_service_1_1;
            },
            function (app_explorer_fileExplorer_component_1_1) {
                app_explorer_fileExplorer_component_1 = app_explorer_fileExplorer_component_1_1;
            }],
        execute: function() {
            AllFilesComponent = (function () {
                function AllFilesComponent(http) {
                    this.http = http;
                    this.folders = new Array();
                    this.http = http;
                    this.getFiles();
                }
                AllFilesComponent.prototype.getFiles = function () {
                    //dropbox for now
                    return this.getFilesDropbox();
                };
                AllFilesComponent.prototype.getFilesDropbox = function () {
                    var _this = this;
                    this.http.get('http://localhost:8080/WSCloudUnifierService/cloudUnifier/getTree?cloud=db&path=/')
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.files = data; }, function (err) { return _this.logError(err); }, function () { return _this.getFilesFromDropbox(); });
                };
                AllFilesComponent.prototype.getFilesFromDropbox = function () {
                    // console.log(this.files);
                    var details = this.files.files;
                    for (var i = 0; i < details.length; i++) {
                        var name = details[i].path;
                        var size = details[i].size;
                        var date = details[i].modified;
                        var prov = "dropbox";
                        var own = "Proprietaire";
                        var lien = details[i].path;
                        this.folders.push(new Folder(name, size, date, prov, own, lien));
                    }
                    console.log(this.folders[0]);
                };
                AllFilesComponent.prototype.logError = function (err) {
                    console.error('ERROR get all files ' + err);
                };
                AllFilesComponent = __decorate([
                    core_1.Component({
                        selector: "all-files",
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES, app_explorer_fileExplorer_component_1.FileExplorer],
                        providers: [app_menu_allFiles_service_1.AllFilesService],
                        template: "\n  <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n          <h2 class=\"panel-title\">Documents </h2>\n        </div>\n        <div class=\"panel-body\">\n          <span class=\"counter pull-right\"></span>\n          <table class=\"table table-bordered table-responsive table-hover results\" id=\"dataTables-example\">\n              <tr>\n                <th>Nom</th> <th>taille</th> <th>Date de Modification</th> <th>Provenance</th> <th>Propri\u00E9taire</th><th>Lien</th>\n              </tr>\n            <tbody>\n\n                  <tr *ngFor=\"let folder of folders\" >\n\n                    <td> <h1><span class=\"glyphicon glyphicon-file\"></span></h1>{{ folder.name }} </td>\n                    <td> {{ folder.size }} </td>\n                    <td> {{ folder.date }}</td>\n                    <td> {{ folder.provide }}</td>\n                    <td> {{ folder.owner }}</td>\n                    <td> <a href=\"{{ folder.link }}\" class=\"glyphicon glyphicon-download-alt\" style=\"margin:auto;\"> </a></td>\n                  </tr>\n\n            </tbody>\n          </table>\n        </div>\n      </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AllFilesComponent);
                return AllFilesComponent;
            }());
            exports_1("AllFilesComponent", AllFilesComponent);
            Folder = (function () {
                function Folder(name, size, date, provide, own, link) {
                    this.name = name;
                    this.size = size;
                    this.date = date;
                    this.provide = provide;
                    this.own = own;
                    this.link = link;
                    this._name = name;
                    this._size = size;
                    this._date = date;
                    this._provide = provide;
                    this._own = own;
                    this._link = link;
                }
                return Folder;
            }());
        }
    }
});
//# sourceMappingURL=app.menu.allFiles.component.js.map