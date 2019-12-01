import { LocalstorageService } from "./localstorage.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private rootAPI: string =
    "http://www.cpe.rmuti.ac.th/project/sqlchecking/api/";

  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
  ) {}

  public get = (path: string, queryParms: string = "") => {
    return new Promise(resolve => {
      this.http
        .get(
          `${this.rootAPI}${path}${queryParms.length > 0 ? queryParms : ""}`,
          {
            headers: {
              Authorization:
                this.localStorage.get("userlogin") != null
                  ? this.localStorage.get("userlogin")["token"]
                  : "null"
            }
          }
        )
        .toPromise()
        .then(value => {
          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          resolve({ connect: false, value: reason });
        });
    });
  };

  public post = (
    path: string,
    formData: any = null,
    queryParms: string = ""
  ) => {
    return new Promise(resolve => {
      this.http
        .post(
          `${this.rootAPI}${path}${queryParms.length > 0 ? queryParms : ""}`,
          formData,
          {
            headers: {
              Authorization:
                this.localStorage.get("userlogin") != null
                  ? this.localStorage.get("userlogin")["token"]
                  : "null"
            }
          }
        )
        .toPromise()
        .then(value => {
          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          resolve({ connect: false, value: reason });
        });
    });
  };
}
