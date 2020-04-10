import { Component, OnInit } from "@angular/core";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { AppService } from "src/app/services/app.service";
import { async } from "q";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent implements OnInit {
  public datagroupchange1: any = null;
  public datamajor: any = null;
  public namegroup: any = "ไม่ได้เลือก";
  public acronym_addgroup: any = null;
  public code_addgroup: any = null;

  constructor(
    public localStorage: LocalstorageService,
    private router: Router,
    private alert: AlertService,
    private http: HttpService,
    public service: AppService
  ) {
    this.getGroup();
    this.getMajor();
  }

  ngOnInit() {
    // this.alert.confirmAlert("ยืนยัน", "Hello").then((value: boolean) => {
    //   if (value) {
    //     console.log("กดยืนยัน");
    //   }
    // });
  }

  public getGroup = async () => {
    let getData: any = await this.http.get("admin/ongetgroupchange");
    console.log(getData);
    if (getData.connect) {
      if (getData.value.rowCount > 0) {
        this.datagroupchange1 = getData.value.result;
      } else {
        this.datagroupchange1 = null;
      }
    } else {
      this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  public onsearchgroup = (array: any, textsearch: string) => {
    if (textsearch.length > 0) {
      return [
        ...array.filter(
          value => value.study_group_name.indexOf(textsearch) > -1
        ),
        ...array.filter(value => value.name_th.indexOf(textsearch) > -1)
      ];
    } else {
      return array;
    }
  };

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
    this.namegroup = acronym;
    this.code_addgroup = code;

    console.log(code);
  }

  public insertgroup(a) {
    study_group_name: this.namegroup + "." + a;
    mj_code: this.code_addgroup;

    this.alert
      .confirmAlert("คุณแน่ใจที่จะเพิ่มกลุ่มเรียน ?")
      .then(async (value: any) => {
        if (value) {
          let getData: any = await this.http.get(
            "admin/insertgroup/" +
              this.namegroup +
              "." +
              a +
              "/" +
              this.code_addgroup
          );
          console.log(getData);

          if (getData.connect) {
            if (getData.value.result == true) {
              this.alert.alert("success", "เพิ่มข้อมูลสำเร็จ");
              this.getGroup();
            } else {
              this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
            }
          } else {
          }
        }
      });
  }

  public deletegroup(study_group_id: any) {
    this.alert.confirmAlert("ลบรายการนี้หรือไม่").then(async (value: any) => {
      if (value) {
        let getData: any = await this.http.get(
          "admin/ondeletegroup/" + study_group_id
        );
        console.log(getData);
        if (getData.connect) {
          if (getData.value.result == true) {
            this.alert.alert("success", "ลบข้อมูลสำเร็จ");
            this.getGroup();
          } else {
            this.alert.alert("error", "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
          }
        } else {
        }
      }
    });
  }
}
