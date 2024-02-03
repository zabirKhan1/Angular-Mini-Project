import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import {  UsersTypes } from "../Components/Models/userModels";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) { }

  Analytics = new BehaviorSubject<String>("");

  getAllUsers(): Observable<any[]> {
    return this.http.get<UsersTypes[]>("http://localhost:3000/users");
  }

  AddUser(user: UsersTypes): Observable<any[]> {
    return this.http.post<UsersTypes[]>("http://localhost:3000/users", user);
  }

  getUserById(Id: number): Observable<any> {
    return this.http.get<UsersTypes>(`http://localhost:3000/users/${Id}`);
  }

  updateUserById(user: UsersTypes, Id: number): Observable<any[]> {
    return this.http.put<UsersTypes[]>(
      `http://localhost:3000/users/${Id}`,
      user
    );
  }

  deleteUserById(Id:any): Observable<any[]> {
    return this.http.delete<UsersTypes[]>(`http://localhost:3000/users/${Id}`);
  }
}
