System.register(['@angular/core', './courses.component', './menu/app.menu.NavBar.component', './explorer/app.explorer.fileExplorer.component'], function(exports_1, context_1) {
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
    var core_1, courses_component_1, app_menu_NavBar_component_1, app_explorer_fileExplorer_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (courses_component_1_1) {
                courses_component_1 = courses_component_1_1;
            },
            function (app_menu_NavBar_component_1_1) {
                app_menu_NavBar_component_1 = app_menu_NavBar_component_1_1;
            },
            function (app_explorer_fileExplorer_component_1_1) {
                app_explorer_fileExplorer_component_1 = app_explorer_fileExplorer_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        template: "<h1>My Fcx 2 App</h1>\n    <my_navBar></my_navBar>\n    <courses></courses>\n    <file-explorer></file-explorer>\n    ",
                        directives: [courses_component_1.CoursesComponent, app_menu_NavBar_component_1.MyNavBar, app_explorer_fileExplorer_component_1.FileExplorer]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map