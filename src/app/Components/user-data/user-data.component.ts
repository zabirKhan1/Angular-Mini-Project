import { Component } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { loadUsersList } from "../../Store/actions/userList.action";
import { AppState } from "../../Store/app.state";
import { selectUserList } from "../../Store/selector/userList.selector";

@Component({
  selector: "app-user-data",
  standalone: true,
  imports: [MatTableModule, AsyncPipe],
  templateUrl: "./user-data.component.html",
  styleUrl: "./user-data.component.css",
})
export class UserDataComponent {
  constructor(private store: Store<AppState>) {}
  userList$!: Observable<any>;
  users: any = [];
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  ngOnInit() {
    this.store.dispatch(loadUsersList());
    this.userList$ = this.store.select(selectUserList);
  }
}
