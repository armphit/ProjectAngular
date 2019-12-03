import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { LoginComponent } from "./components/login/login.component";
import { AppGuard } from "./guards/app.guard";
import { DefaultLayoutComponent } from "./components/default-layout/default-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent,
    canActivate: [AppGuard],
    children: [
      {
        path: "changePassword",
        component: ChangePasswordComponent
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./components/admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: "student",
        loadChildren: () =>
          import("./components/student/student.module").then(
            m => m.StudentModule
          )
      },
      {
        path: "teacher",
        loadChildren: () =>
          import("./components/teacher/teacher.module").then(
            m => m.TeacherModule
          )
      },
      {
        path: "header",
        loadChildren: () =>
          import("./components/header/header.module").then(m => m.HeaderModule)
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  { path: "notfound", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
