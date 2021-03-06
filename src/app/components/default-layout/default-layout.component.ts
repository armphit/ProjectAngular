import { AppService } from "./../../services/app.service";
import { HttpService } from "./../../services/http.service";
import { AlertService } from "./../../services/alert.service";
import { LocalstorageService } from "./../../services/localstorage.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

var screen_x = window.matchMedia("(min-width: 1024px)");
var cssRoot = document.documentElement;
const screenMatch = callback => {
  callback(screen_x.matches);
  screen_x.addEventListener("change", value => {
    callback(value.matches);
  });
};

@Component({
  selector: "app-default-layout",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"]
})
export class DefaultLayoutComponent implements OnInit {
  public stateScreen = {
    sidebarShow: window.matchMedia("(min-width: 1024px)").matches,
    displayMatch: window.matchMedia("(min-width: 1024px)").matches
  };
  public userlogin: any = null;
  constructor(
    public localStorage: LocalstorageService,
    private router: Router,
    private alert: AlertService,
    private http: HttpService,
    public service: AppService
  ) {}

  ngOnInit() {
    screenMatch(value => {
      this.stateScreen = { sidebarShow: value, displayMatch: value };

      cssRoot.style.setProperty(
        "--dl-sidebar-width",
        this.stateScreen.sidebarShow == true ? "270px" : "0px"
      );

      cssRoot.style.setProperty(
        "--dl-content-mr",
        this.stateScreen.sidebarShow == true &&
          this.stateScreen.displayMatch == true
          ? "270px"
          : this.stateScreen.sidebarShow == true &&
            this.stateScreen.displayMatch == false
          ? "0px"
          : "0px"
      );
    });

    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/project/sqlchecking/"
    ) {
      this.router.navigate([
        this.localStorage.get("userlogin")["status"] == "Admin"
          ? "/admin"
          : this.localStorage.get("userlogin")["status"] == "Student"
          ? "/student"
          : ""
      ]);
    }
  }

  public sidebarChange = () => {
    this.stateScreen.sidebarShow = !this.stateScreen.sidebarShow;
    cssRoot.style.setProperty(
      "--dl-sidebar-width",
      this.stateScreen.sidebarShow == true ? "270px" : "0px"
    );

    cssRoot.style.setProperty(
      "--dl-content-mr",
      this.stateScreen.sidebarShow == true &&
        this.stateScreen.displayMatch == true
        ? "270px"
        : this.stateScreen.sidebarShow == true &&
          this.stateScreen.displayMatch == false
        ? "0px"
        : "0px"
    );
  };

  public onLogout = () => {
    this.alert
      .confirmAlert("ยืนยันการออกจากระบบ")
      .then(async (value: boolean) => {
        if (value == true) {
          this.service.loadingState = true;
          this.router.navigate(["/login"]);
          this.localStorage.clear();
          this.service.loadingState = false;
        }
      });
  };
}
