System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MyTabs;
    return {
        setters:[],
        execute: function() {
            MyTabs = (function () {
                function MyTabs() {
                }
                MyTabs.prototype.getTabs = function () {
                    var TABS = [{ "_name": "Tous les fichiers" }, { "_name": "Partagés avec vous" },
                        { "_name": "Dashboard" }];
                    return TABS;
                    // return [new MyTab('Tous les fichiers'), new MyTab('Partagés avec vous'), new MyTab('DashBoard')];
                };
                return MyTabs;
            }());
            exports_1("MyTabs", MyTabs);
        }
    }
});
//# sourceMappingURL=app.menu.tab.service.js.map