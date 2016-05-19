System.register(['@angular/http', '@angular/core'], function(exports_1, context_1) {
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
    var http_1, core_1;
    var Login;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login(http) {
                    this.http = http;
                }
                // connectDropbox() {
                //   window.location.href = this.url;
                //   console.log('Authentification !')
                // }
                Login.prototype.getURL = function () {
                    var _this = this;
                    this.http.get('https://www.dropbox.com/1/oauth2/authorize?client_id=wl5n5wq11bvcnst&response_type=code&redirect_uri=http://localhost:3000/allFiles')
                        .map(function (res) { return res.text(); })
                        .subscribe(function (data) { return _this.url = data; }, function (err) { return _this.logError(err); }, function () { return console.log('Authentification !'); });
                };
                // getReponse(){
                //   this.http.get(this.url)
                //     .map(res => res.json())
                //     .subscribe(
                //     data => console.log(data),
                //     err => this.logError(err),
                //     () => console.log('truc')
                //     );
                // }
                Login.prototype.logError = function (err) {
                    console.error('ERROR !');
                };
                Login = __decorate([
                    core_1.Component({
                        selector: 'my_login',
                        template: "\n  <header>\n    <h1 class=\"title\">Connection</h1>\n  </header>\n  <button class=\"btn btn-primary\" (click)=\"getURL()\">DROPBOX</button>\n  <br><br><br>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], Login);
                return Login;
            }());
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=app.component.login.js.map