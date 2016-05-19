System.register(['@angular/http', '@angular/core', './app.connected.service'], function(exports_1, context_1) {
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
    var http_1, core_1, app_connected_service_1;
    var Login;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_connected_service_1_1) {
                app_connected_service_1 = app_connected_service_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(http, connect) {
                    this.http = http;
                    this.connect = connect;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                    this.headers.append('Access-Control-Allow-Origin', '*');
                }
                /**
                 * Se connecter à la fenêtre d'authentification de Dropbox
                 */
                Login.prototype.connectDropbox = function () {
                    var _this = this;
                    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles';
                    this.http.get(this.url, this.headers)
                        .map(function (res) { return res.text(); })
                        .subscribe(function (data) { return console.log('Connection ...'); }, function (err) { return _this.logError(err); }, function () { return window.location.href = _this.url; });
                };
                /**
                 * Vérifie que le client est connecté
                 */
                // isconnected(){
                //   this.urlConnect = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/isConnected?cloud=db';
                //   this.http.get(this.urlConnect)
                //   .map(res => res.json())
                //   .subscribe
                //   (
                //     data => this.connect.setConnect(data.isConnected),
                //     err => this.logError(err),
                //     () => console.log("Connected")
                //     );
                // }
                Login.prototype.logError = function (err) {
                    console.error('ERROR !');
                };
                Login = __decorate([
                    core_1.Component({
                        selector: 'my_login',
                        template: "\n  <header>\n  <h1 class=\"title\">Connection</h1>\n  </header>\n  <span id=\"buttons\">\n  <button style=\"height:50px;width:100px\"class=\"btn btn-primary\" (click)=\"connectDropbox()\">DROPBOX</button>\n  <button style=\"height:50px;width:100px\" class=\"btn btn-primary\" (click)=\"connectDropbox()\">GOOGLE DRIVE</button>\n  </span>\n  <br><br><br>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, app_connected_service_1.Connected])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=app.component.login.js.map