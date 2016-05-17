System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MyFile;
    return {
        setters:[],
        execute: function() {
            MyFile = (function () {
                function MyFile(title, dateModif, contentFile) {
                    this.title = title;
                    this.dateModif = dateModif;
                    this.contentFile = contentFile;
                }
                return MyFile;
            }());
            exports_1("MyFile", MyFile);
        }
    }
});
//# sourceMappingURL=my_file.js.map