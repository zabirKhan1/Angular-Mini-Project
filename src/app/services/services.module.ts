import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { UserType } from "../Components/Models/userModels";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  Analytics = new BehaviorSubject<String>('');
  getUsers(): Observable<any[]> {
    return this.http.get<UserType[]>("https://jsonplaceholder.org/users");
  }
}
