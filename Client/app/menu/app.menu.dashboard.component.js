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
                    this.getUserInfo();
                }
                DashBoardComponent.prototype.getUserInfo = function () {
                    var _this = this;
                    this.url = 'http://localhost:8080/WSCloudUnifierService/cloudUnifier/getUDetails?cloud=db';
                    this.http.get(this.url)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        _this.name = data.name_details.familiar_name;
                        _this.surname = data.name_details.surname;
                        _this.mail = data.email;
                        _this.spaceFree = data.quota_info.normal;
                        _this.spaceAvailable = data.quota_info.quota;
                        _this.country = data.country;
                    }, function (err) { return _this.logError(err); }, function () { });
                };
                DashBoardComponent.prototype.logError = function (err) {
                    console.error('ERROR !');
                };
                DashBoardComponent = __decorate([
                    core_1.Component({
                        selector: "dashboard",
                        template: "\n \t{{url}}<br>\n \t{{name}}<br>\n \t{{surname}}<br>\n \t{{mail}}<br>\n \t{{country}}<br>\n \t{{spaceFree}}<br>\n \t{{spaceAvailable}}<br>\n  "
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