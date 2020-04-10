import { AppService } from "src/app/services/app.service";
import { HttpService } from "src/app/services/http.service";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
import { LocalstorageService } from "src/app/services/localstorage.service";

import { Component, OnInit } from "@angular/core";
import { FnParam } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"]
})
export class TeacherComponent implements OnInit {
  public datagroup_teacher: any = null;
  public dataprefix: any = null;
  public nameprefix: any = null;
  public idprefix: any = null;
  public datamajor: any = null;
  public code_addgroup: any = null;
  groupst = true;

  constructor(
    public localStorage: LocalstorageService,
    private router: Router,
    private alert: AlertService,
    private http: HttpService,
    public service: AppService
  ) {}

  ngOnInit() {
    this.ongetgroup_teacher();
    this.ongetprefix();
  }
  public ongetgroup_teacher = async () => {
    let getData: any = await this.http.get("admin/ongetgroup_teacher");

    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.datagroup_teacher = getData.value.result;
      } else {
        this.datagroup_teacher = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  public onSearch_Teacher = (array: any, textsearch: string) => {
    if (textsearch.length > 0) {
      return [
        ...array.filter(
          value => value.study_group_name.indexOf(textsearch) > -1
        ),
        ...array.filter(value => value.name.indexOf(textsearch) > -1)
      ];
    } else {
      return array;
    }
  };

  public ongetprefix = async () => {
    let getData: any = await this.http.get("admin/ongetprefix");

    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.dataprefix = getData.value.result;
      } else {
        this.dataprefix = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };
  public name_prefix(prefix_name: any, prefix_id: any) {
    this.nameprefix = prefix_name;
    this.idprefix = prefix_id;

    //console.log(prefix_id);
  }

  public insertteacher(id, fn, ln) {
    ad_id: id;
    prefix_id: this.idprefix;
    fname: fn;
    lname: ln;

    this.alert
      .confirmAlert("คุณแน่ใจที่จะเพิ่มอาจารย์ ?")
      .then(async (value: any) => {
        if (value) {
          let getData: any = await this.http.get(
            "admin/insertteacher/" +
              id +
              "/" +
              this.idprefix +
              "/" +
              fn +
              "/" +
              ln
          );

          if (getData.connect) {
            if (getData.value.result == true) {
              this.alert.alert("success", "เพิ่มข้อมูลสำเร็จ");
              this.ongetgroup_teacher();
            } else {
              this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
            }
          } else {
          }
        }
      });
  }

  public deletead(id_ad: any) {
    this.alert.confirmAlert("ลบรายการนี้หรือไม่").then(async (value: any) => {
      if (value) {
        let getData: any = await this.http.get("admin/ondeletead/" + id_ad);
        console.log(getData);
        if (getData.connect) {
          if (getData.value.result == true) {
            this.alert.alert("success", "ลบข้อมูลสำเร็จ");
            this.ongetgroup_teacher();
          } else {
            this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
          }
        } else {
        }
      }
    });
  }

  public getMajor = async () => {
    let getData: any = await this.http.get("admin/ongetmajor");

    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.datamajor = getData.value.result;
      } else {
        this.datamajor = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  public namegroupch(acronym: any, code: any, name_th: any) {
    this.code_addgroup = code;

    console.log(code);
  }
}
