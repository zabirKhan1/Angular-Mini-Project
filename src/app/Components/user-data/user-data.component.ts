import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser, loadUsersList } from "../../Store/actions/userList.action";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Route, Router, RouterLink } from "@angular/router";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import { DateConvertorPipe } from "../../CustomPipe/date-convertor.pipe";

@Component({
  selector: "app-user-data",
  standalone: true,
  imports: [MaterialModuleModule, AsyncPipe, RouterLink, DateConvertorPipe],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(private store: Store, private route: Router) {}
  userList$!: Observable<any>;
  users: any = [];
  NumberOfUser: number | null = null;
  displayedColumns: string[] = [
    "firstname",
    "email",
    "address",
    "dob",
    "company",
    "createdAt",
    "updatedAt",
    "view",
    "edit",
    "delete",
  ];

  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
    this.userList$.subscribe((user) => (this.NumberOfUser = user.length));
  }

  AddUser() {
    this.route.navigate(["add-user"]);
  }

  viewUser(id: string): void {
    this.route.navigate([`view-user-details/${id}`]);
  }

  editUser(id: string): void {
    this.route.navigate([`edit-user/${id}`]);
  }

  deleteUser(Id: any): void {
    this.store.dispatch(deleteUser(Id.toString()));
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
  }
}
