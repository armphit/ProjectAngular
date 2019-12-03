import { Component, OnInit } from "@angular/core";
import { LocalstorageService } from "src/app/services/localstorage.service";
import { Router } from "@angular/router";
import { AlertService } from "src/app/services/alert.service";
import { HttpService } from "src/app/services/http.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-manage-data",
  templateUrl: "./manage-data.component.html",
  styleUrls: ["./manage-data.component.scss"]
})
export class ManageDataComponent implements OnInit {
  constructor(
    public localStorage: LocalstorageService,
    private router: Router,
    private alert: AlertService,
    private http: HttpService,
    public service: AppService
  ) {}

  ngOnInit() {}
}
