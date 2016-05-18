System.register(['@angular/core', './app.menu.tab.service', '@angular/router', '../crisis-list.component', '../hero-list.component', '../app.component.login'], function(exports_1, context_1) {
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
    var core_1, app_menu_tab_service_1, router_1, crisis_list_component_1, hero_list_component_1, app_component_login_1;
    var MyNavBar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_menu_tab_service_1_1) {
                app_menu_tab_service_1 = app_menu_tab_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (crisis_list_component_1_1) {
                crisis_list_component_1 = crisis_list_component_1_1;
            },
            function (hero_list_component_1_1) {
                hero_list_component_1 = hero_list_component_1_1;
            },
            function (app_component_login_1_1) {
                app_component_login_1 = app_component_login_1_1;
            }],
        execute: function() {
            MyNavBar = (function () {
                function MyNavBar(tabs) {
                    this._tabs = tabs.getTabs();
                }
                // loginTab: MyTab = { "_name": "Login" };
                MyNavBar.prototype.onSelect = function (tab) { this.selectedTab = tab; };
                MyNavBar = __decorate([
                    core_1.Component({
                        selector: 'my_navBar',
                        templateUrl: 'app/menu/my_navBar.html',
                        providers: [app_menu_tab_service_1.MyTabs],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.Routes([
                        { path: '/crisis-center', component: crisis_list_component_1.CrisisListComponent },
                        { path: '/heroes', component: hero_list_component_1.HeroListComponent },
                        { path: '/login', component: app_component_login_1.Login },
                        { path: '*', component: crisis_list_component_1.CrisisListComponent }]), 
                    __metadata('design:paramtypes', [app_menu_tab_service_1.MyTabs])
                ], MyNavBar);
                return MyNavBar;
            }());
            exports_1("MyNavBar", MyNavBar);
        }
    }
});
//# sourceMappingURL=app.menu.NavBar.component.js.map