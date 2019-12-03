import { StudentComponent } from "./manage-data/student/student.component";
import { TeacherComponent } from "./manage-data/teacher/teacher.component";
import { GroupComponent } from "./manage-data/group/group.component";

import { ManageDataComponent } from "./manage-data/manage-data.component";
import { AdminComponent } from "./admin.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "manage-data",
        component: ManageDataComponent,
        children: [
          { path: "group", component: GroupComponent },
          { path: "teacher", component: TeacherComponent },
          { path: "student", component: StudentComponent },
          {
            path: "",
            redirectTo: "/admin/manage-data/group",
            pathMatch: "full"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/admin/manage-data",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
