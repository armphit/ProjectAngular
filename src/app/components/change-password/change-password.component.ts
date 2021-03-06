import { AppService } from "src/app/services/app.service";
import { HttpService } from "src/app/services/http.service";
import { AlertService } from "src/app/services/alert.service";

import { Component, OnInit } from "@angular/core";
import { LocalstorageService } from "src/app/services/localstorage.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  public datagroup_notnull: any = null;
  public major1: any = null;
  public idgroup1: any = null;
  public ad1: any = null;
  public datast_group: any = null;
  constructor(
    public localStorage: LocalstorageService,
    private alert: AlertService,
    private http: HttpService,
    public service: AppService
  ) {}

  ngOnInit() {
    this.ongetgroup_teacher();
  }
  public ongetgroup_teacher = async () => {
    let getData: any = await this.http.get("admin/ongetgroup_notNULL");

    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.datagroup_notnull = getData.value.result;
      } else {
        this.datagroup_notnull = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  public ongetmajor_and_ad = async (
    major: any = null,
    ad: any = null,
    groupid: any
  ) => {
    this.idgroup1 = groupid;
    this.major1 = major;
    this.ad1 = ad;
    this.ongetstudent_group(groupid);
  };

  public ongetstudent_group = async (groupid: any) => {
    this.datast_group = null;
    let getData: any = await this.http.get(
      "admin/ongetstudent_group/" + groupid
    );
    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.datast_group = getData.value.result;
      } else {
        this.datast_group = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };
  public onsearch_student_group = (array: any, textsearch: string) => {
    if (textsearch.length > 0) {
      return [
        ...array.filter(value => value.STUDENT_NO.indexOf(textsearch) > -1),
        ...array.filter(value => value.NAME.indexOf(textsearch) > -1),
        ...array.filter(value => value.LNAME.indexOf(textsearch) > -1)
      ];
    } else {
      return array;
    }
  };
}
