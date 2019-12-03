import { SharedModules } from "./../../shared-modules";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { ManageDataComponent } from "./manage-data/manage-data.component";
import { GroupComponent } from "./manage-data/group/group.component";
import { TeacherComponent } from "./manage-data/teacher/teacher.component";
import { StudentComponent } from './manage-data/student/student.component';

@NgModule({
  declarations: [
    AdminComponent,
    ManageDataComponent,
    GroupComponent,
    TeacherComponent,
    StudentComponent
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModules]
})
export class AdminModule {}
