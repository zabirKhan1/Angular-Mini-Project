import { AsyncPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { Observable, of } from "rxjs";
import { ajax } from "rxjs/ajax";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-user-data",
  standalone: true,
  imports: [MatTableModule, AsyncPipe],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(private http: HttpClient) {}
  userData: any[] = [];
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  userList$ = ajax.getJSON(
    "https://jsonplaceholder.org/users"
  ) as Observable<any>;
}
