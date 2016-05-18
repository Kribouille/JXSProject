System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MyFileFolder;
    return {
        setters:[],
        execute: function() {
            MyFileFolder = (function () {
                function MyFileFolder(tag, name, path_lower, path_display, id, sharing_info, property_groups) {
                    this.tag = tag;
                    this.name = name;
                    this.path_lower = path_lower;
                    this.path_display = path_display;
                    this.id = id;
                    this.sharing_info = sharing_info;
                    this.property_groups = property_groups;
                }
                return MyFileFolder;
            }());
            exports_1("MyFileFolder", MyFileFolder);
        }
    }
});
//# sourceMappingURL=MyFileFolder.js.map