import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadUsersList } from "../../Store/actions/userList.action";
import { AppState } from "../../Store/app.state";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Route, Router, RouterLink } from "@angular/router";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";

@Component({
  selector: "app-user-data",
  standalone: true,
  imports: [MaterialModuleModule, AsyncPipe, RouterLink],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(private store: Store<AppState>, private route: Router) {}
  userList$!: Observable<any>;
  users: any = [];
  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "view",
    "edit",
    "delete",
  ];

  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
  }

  AddUser() {
    this.route.navigate(["add-user"]);
  }

  viewUser(): void {
    this.route.navigate(["view-user-details"]);
  }

  editUser(): void {}


  deleteUser(): void {

  }
}
