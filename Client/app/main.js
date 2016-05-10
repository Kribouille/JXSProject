System.register(['@angular/platform-browser-dynamic', '@angular/http', 'rxjs/Rx', "./Explorer"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, http_1, Explorer_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (Explorer_1_1) {
                Explorer_1 = Explorer_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(Explorer_1.Explorer, [http_1.HTTP_PROVIDERS]);
        }
    }
});
