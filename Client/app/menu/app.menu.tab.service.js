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
                    return ["Tous les fichiers", "Partagés avec vous", "DashBoard"];
                };
                return MyTabs;
            }());
            exports_1("MyTabs", MyTabs);
        }
    }
});
//# sourceMappingURL=app.menu.tab.service.js.map