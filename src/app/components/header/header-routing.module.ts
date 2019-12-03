import { HeaderComponent } from "./header.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [{ path: "", component: HeaderComponent, children: [] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule {}
