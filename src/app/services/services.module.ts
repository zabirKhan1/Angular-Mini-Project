import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserType } from "../Components/Models/userModels";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<UserType[]>("https://jsonplaceholder.org/users");
  }
}
