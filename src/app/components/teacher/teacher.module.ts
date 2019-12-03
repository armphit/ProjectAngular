import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeacherRoutingModule } from "./teacher-routing.module";
import { TeacherComponent } from "./teacher.component";

@NgModule({
  declarations: [TeacherComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModules]
})
export class TeacherModule {}
