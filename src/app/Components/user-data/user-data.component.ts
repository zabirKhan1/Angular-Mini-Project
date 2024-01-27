import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { of } from "rxjs";
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
  imports: [MatTableModule],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(private http: HttpClient) {}
  userData: any[] = [];
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  ngOnInit() {
    let userList$ = ajax.getJSON("https://jsonplaceholder.org/users");
    userList$.subscribe((res) => {
      this.userData = res as any;
    });
  }
}
