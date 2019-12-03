import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentRoutingModule } from "./student-routing.module";
import { StudentComponent } from "./student.component";

@NgModule({
  declarations: [StudentComponent],
  imports: [CommonModule, StudentRoutingModule, SharedModules]
})
export class StudentModule {}
