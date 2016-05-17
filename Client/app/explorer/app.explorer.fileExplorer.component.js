System.register(['@angular/core', './app.explorer.fileExplorer.service'], function(exports_1, context_1) {
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
    var core_1, app_explorer_fileExplorer_service_1;
    var FileExplorer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_explorer_fileExplorer_service_1_1) {
                app_explorer_fileExplorer_service_1 = app_explorer_fileExplorer_service_1_1;
            }],
        execute: function() {
            FileExplorer = (function () {
                function FileExplorer(_fileService) {
                    this._fileService = _fileService;
                }
                FileExplorer.prototype.ngOnInit = function () {
                    this.getFiles();
                };
                FileExplorer.prototype.getFiles = function () {
                    var _this = this;
                    return this._fileService.getFiles() //observable
                        .subscribe(function (data) { _this.files = data; }, function (err) { return console.error(err); }, function () { return console.log('done'); });
                };
                FileExplorer = __decorate([
                    core_1.Component({
                        selector: 'file-explorer',
                        providers: [app_explorer_fileExplorer_service_1.FileExplorerService],
                        template: "\n  <div class=\"explorer\" style =\"border-style : solid ;\" >\n\n    <ul>\n      <li *ngFor=\"let f of files\">\n        <strong>{{f.title}}</strong> <br><br>\n        <div class=\"file_content\">{{f.contentFile}}</div>\n      </li>\n    </ul>\n  </div>\n  "
                    }), 
                    __metadata('design:paramtypes', [app_explorer_fileExplorer_service_1.FileExplorerService])
                ], FileExplorer);
                return FileExplorer;
            }());
            exports_1("FileExplorer", FileExplorer);
        }
    }
});
//# sourceMappingURL=app.explorer.fileExplorer.component.js.map