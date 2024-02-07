import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import { CommonServices } from "../../services/services.module";
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { loadUsersDataById } from "../../Store/actions/userList.action";
import { Observable } from "rxjs";
import { selectUserById } from "../../Store/selector/userList.selector";
import { UsersTypes } from "../Models/userModels";
import { DateConvertorPipe } from "../../CustomPipe/date-convertor.pipe";

@Component({
  selector: "app-user-details",
  standalone: true,
  imports: [MaterialModuleModule, AsyncPipe, DateConvertorPipe],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent {
  user: UsersTypes | undefined;
  userById$!: Observable<UsersTypes>;
  userId: any;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private CommonServices: CommonServices
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.store.dispatch(loadUsersDataById({ code: this.userId }));
    this.userById$ = this.store.select(selectUserById);
    this.userById$.subscribe((user) => (this.user = user));
  }

  goBack(): void {
    this.router.navigate(["/user-data"]);
  }
}
