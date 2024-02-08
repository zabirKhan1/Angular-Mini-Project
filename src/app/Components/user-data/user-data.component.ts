import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { deleteUser, loadUsersList } from "../../Store/actions/userList.action";
import { selectUserList } from "../../Store/selector/userList.selector";
import { Route, Router, RouterLink } from "@angular/router";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import { DateConvertorPipe } from "../../CustomPipe/date-convertor.pipe";
import { DialogBoxComponent } from "../dialog-box/dialog-box.component";
import { MatDialog } from "@angular/material/dialog";
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
  selector: "app-user-data",
  standalone: true,
  imports: [MaterialModuleModule, AsyncPipe, RouterLink, DateConvertorPipe],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(
    private store: Store,
    private route: Router,
    private dialog: MatDialog
  ) {}
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
    "actions",
  ];

  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
    this.userList$.subscribe((user) => {
      this.NumberOfUser = user.length;
      this.users = user;
    });
  }

  AddUser() {
    this.route.navigate(["add-user"]);
  }

  viewUser(id: string): void {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: "450px",
      data: id,
    });
  }

  editUser(id: string): void {
    this.route.navigate([`edit-user/${id}`]);
  }

  deleteUser(Id: any): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: "500px",
      data: {
        title: "Confirmation",
        message: "Are you sure you want to delete the user?",
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(deleteUser(Id.toString()));
        this.store.dispatch(loadUsersList());
        this.userList$ = this.store.select(selectUserList);
      }
    });
  }
}
