import {Component} from '@angular/core';
import {CourseService} from './course.service';

@Component({
  selector:'courses',
  template:`
  <div class="courses" style ="border-style : solid ;" >
  <h2>Course</h2>
  <ul>
    <li *ngFor="let course of courses">
      {{course}}
    </li>
  </ul>
  {{title}}
  </div>`,
  providers: [CourseService]
})
export class CoursesComponent{
  title: String = "Titre"
  courses;

  constructor(courseService: CourseService){
    this.courses = courseService.getCourses();
  }
}
