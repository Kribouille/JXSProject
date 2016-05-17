import {Component} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {MyNavBar} from './menu/app.menu.NavBar.component';
import {FileExplorer} from './explorer/app.explorer.fileExplorer.component';

@Component({
    selector: 'my-app',
    template: `<h1>My Fcx 2 App</h1>
    <my_navBar></my_navBar>
    <courses></courses>
    <file-explorer></file-explorer>
    `,
    directives:[CoursesComponent, MyNavBar, FileExplorer]
})
export class AppComponent { }
