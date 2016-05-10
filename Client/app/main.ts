import {bootstrap} from '@angular/platform-browser-dynamic'
import {HTTP_PROVIDERS} from '@angular/http'; // Dependencies for HTTP service
import 'rxjs/Rx'; // For using methods on observables
import {Explorer} from "./Explorer";

bootstrap(Explorer, [HTTP_PROVIDERS]);
