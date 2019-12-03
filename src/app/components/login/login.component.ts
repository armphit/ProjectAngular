import { AlertService } from "./../../services/alert.service";
import { HttpService } from "./../../services/http.service";
import { LocalstorageService } from "./../../services/localstorage.service";
import { AppService } from "./../../services/app.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public service: AppService,
    public localStorage: LocalstorageService,
    private http: HttpService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit() {}

  public getYear = () => {
    return new Date().getFullYear();
  };

  public submitLogin = async (data: NgForm) => {
    this.localStorage.clear();
    let formData = new FormData();
    Object.keys(data.value).forEach(key => {
      formData.append(`${key}`, data.value[key]);
    });

    let httpLogin: any = await this.http.post("login", formData);

    if (httpLogin.connect == true) {
      if (httpLogin.value.success == true) {
        this.alert.alert("success", "เข้าสู่ระบบสำเร็จ");
        this.localStorage.set("userlogin", httpLogin.value.data);
        this.router.navigate([
          httpLogin.value.data.status == "Admin"
            ? "/admin"
            : httpLogin.value.data.status == "Student"
            ? "/student"
            : ""
        ]);
      } else {
        this.alert.alert("error", httpLogin.value.message);
      }
    }
  };

  // login(user:string ,password:string){
  //   if(user==="admin"&&password==="admin"){
  //      this.router.navigate(["/home"]);
  //   }
}
