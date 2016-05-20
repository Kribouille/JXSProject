System.register(['@angular/core', '@angular/http'], function(exports_1, context_1) {
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
    var core_1, http_1;
    var DashBoardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            DashBoardComponent = (function () {
                function DashBoardComponent(http) {
                    this.http = http;
                    this.getUserInfoDropbox();
                    this.getUserInfoDrive();
                }
                DashBoardComponent.prototype.getUserInfoDropbox = function () {
                    var _this = this;
                    this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=db';
                    this.http.get(this.url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this.nameDB = data.name_details.familiar_name;
                        _this.surnameDB = data.name_details.surname;
                        _this.mailDB = data.email;
                        _this.spaceUsedDB = data.quota_info.normal;
                        _this.spaceAvailableDB = data.quota_info.quota;
                        _this.countryDB = data.country;
                        _this.ratio = Math.floor((_this.spaceUsedDB / _this.spaceAvailableDB) * 100000);
                    }, function (err) { return _this.logError(err); }, function () { });
                };
                DashBoardComponent.prototype.getUserInfoDrive = function () {
                    var _this = this;
                    this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=drive';
                    this.http.get(this.url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this.nameDR = data.name;
                        _this.mailDR = data.user.emailAddress;
                        _this.spaceUsedDR = data.quotaBytesUsed;
                        _this.spaceTotalDR = data.quotaBytesTotal;
                        _this.countryDR = data.languageCode;
                        _this.ratioGD = Math.floor((_this.spaceUsedDR / _this.spaceTotalDR) * 10000000);
                    }, function (err) { return _this.logError(err); }, function () { });
                };
                DashBoardComponent.prototype.logError = function (err) {
                    console.error('ERROR !');
                };
                DashBoardComponent = __decorate([
                    core_1.Component({
                        selector: "dashboard",
                        template: "\n\t<table class=\"table table-bordered table-responsive table-hover results\" >\n\t<thead><tr>\n\t<th>#</th>\n\t<th>Informations Dropbox</th>\n\t<th>Informations Google Drive</th>\n\t</tr>\n\t</thead>\n\t<tbody>\n\t<tr>\n\t<th scope=\"row\">Nom</th>\n\t<td>{{nameDB}}</td>\n\t<td>{{nameDR}}</td>\n\t</tr>\n\t<tr>\n\t<th scope=\"row\">Pr\u00E9nom</th>\n\t<td>{{surnameDB}}</td>\n\t<td>ok</td>\n\t</tr>\n\t<tr>\n\t<th scope=\"row\">Email</th>\n\t<td>{{mailDB}}</td>\n\t<td>{{mailDR}}</td>\n\t</tr>\n\t<tr>\n\t<th scope=\"row\">Pays</th>\n\t<td>{{countryDB}}</td>\n\t<td>{{countryDR}}</td>\n\t</tr>\n\t<tr>\n\t<th scope=\"row\">Espace utilis\u00E9 (en octets)</th>\n\t<td>{{spaceUsedDB}}</td>\n\t<td>{{spaceUsedDR}}</td>\n\t</tr>\n\t<tr>\n\t<th scope=\"row\">Espace total</th>\n\t<td>{{spaceUsedDR}}</td>\n\t<td>{{spaceTotalDR}}</td>\n\t</tr>\n\t</tbody>\n\t</table><br><br>\n\t<h3>Espace libre sur Dropbox</h3>\n\t<div style=\"margin-top=30px;\" class=\"progress\">\n\t<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"76\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:76%\">\n\t<span class=\"sr-only\">70% Complete</span>\n\t</div>\n\t</div>\n\t<h3>Espace libre sur GoogleDrive</h3>\n\t<div style=\"margin-top=30px;\" class=\"progress\">\n\t<div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"76\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:58%\">\n\t<span class=\"sr-only\">70% Complete</span>\n\t</div>\n\t</div>\n\t"
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DashBoardComponent);
                return DashBoardComponent;
            }());
            exports_1("DashBoardComponent", DashBoardComponent);
        }
    }
});
//# sourceMappingURL=app.menu.dashboard.component.js.map