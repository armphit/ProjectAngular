import { LocalstorageService } from "./localstorage.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  private rootAPI: string = "http://127.0.0.1/test12/";
  private rootAPI1 = "http://127.0.0.1/arm/public/";

  constructor(
    private http: HttpClient,
    private localStorage: LocalstorageService
  ) {}

  public post1 = (path: string, data: any) => {
    return new Promise(resolve => {
      this.http
        .post(`${this.rootAPI1}${path}`, data)
        .toPromise()
        .then(value => {
          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          resolve({ connect: false, value: reason });
        });
    });
  };

  public get = (path: string) => {
    return new Promise(resolve => {
      this.http
        .get(`${this.rootAPI}${path}`, {
          headers: {
            Authorization:
              this.localStorage.get("userlogin") != null ? "null" : "null"
          }
        })
        .toPromise()
        .then(value => {
          resolve({ connect: true, value: value });
        })
        .catch(reason => {
          resolve({ connect: false, value: reason });
        });
    });
  };

  public post = (path: string, formData: any = null) => {
    return new Promise(resolve => {
      this.http
        .post(`${this.rootAPI}${path}`, formData)
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
