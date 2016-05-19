System.register(['@angular/core', './menu/app.menu.NavBar.component', './explorer/app.explorer.fileExplorer.component', '@angular/router', './app.component.login', './menu/app.menu.allFiles.component', './menu/app.menu.sharedFiles', './menu/app.menu.dashboard.component'], function(exports_1, context_1) {
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
    var core_1, app_menu_NavBar_component_1, app_explorer_fileExplorer_component_1, router_1, app_component_login_1, app_menu_allFiles_component_1, app_menu_sharedFiles_1, app_menu_dashboard_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_menu_NavBar_component_1_1) {
                app_menu_NavBar_component_1 = app_menu_NavBar_component_1_1;
            },
            function (app_explorer_fileExplorer_component_1_1) {
                app_explorer_fileExplorer_component_1 = app_explorer_fileExplorer_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (app_component_login_1_1) {
                app_component_login_1 = app_component_login_1_1;
            },
            function (app_menu_allFiles_component_1_1) {
                app_menu_allFiles_component_1 = app_menu_allFiles_component_1_1;
            },
            function (app_menu_sharedFiles_1_1) {
                app_menu_sharedFiles_1 = app_menu_sharedFiles_1_1;
            },
            function (app_menu_dashboard_component_1_1) {
                app_menu_dashboard_component_1 = app_menu_dashboard_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router) {
                    this.router = router;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.router.navigate(['/login']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>My Fcx 2 App</h1>\n\t<my_navBar></my_navBar>\n\t<file-explorer></file-explorer>\n\n\n\t",
                        directives: [app_menu_NavBar_component_1.MyNavBar, app_explorer_fileExplorer_component_1.FileExplorer, router_1.ROUTER_DIRECTIVES],
                    }),
                    router_1.Routes([
                        //{ path: '/crisis-center', component: CrisisListComponent },
                        //{ path: '/heroes', component: HeroListComponent },
                        { path: '/allFiles', component: app_menu_allFiles_component_1.AllFilesComponent },
                        { path: '/dashboard', component: app_menu_dashboard_component_1.DashBoardComponent },
                        { path: '/sharedWithUser', component: app_menu_sharedFiles_1.SharedWithUserFilesComponent },
                        { path: '/login', component: app_component_login_1.Login },
                        { path: '*', component: app_menu_allFiles_component_1.AllFilesComponent }]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map