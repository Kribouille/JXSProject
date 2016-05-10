"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var core_2 = require('@angular/core');
var NavClientBar_1 = require('./NavClientBar');
var TabNavBar = (function () {
    function TabNavBar(navBar) {
        this.active = true;
        navBar.addTabToNavBar(this);
    }
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], TabNavBar.prototype, "tabTitle", void 0);
    TabNavBar = __decorate([
        core_1.Component({
            selector: 'tabNavBar',
            template: "\n    <div [hidden]=\"!active\">\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [NavClientBar_1.NavClientBar])
    ], TabNavBar);
    return TabNavBar;
}());
exports.TabNavBar = TabNavBar;
//# sourceMappingURL=TabNavBar.js.map