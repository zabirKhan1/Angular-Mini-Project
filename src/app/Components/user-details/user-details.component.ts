import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import { UserService } from "../../services/services.module";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-user-details",
  standalone: true,
  imports: [MaterialModuleModule, AsyncPipe],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserById(Number(this.route.snapshot.paramMap.get("id")))
      .subscribe((data) => (this.user = data));
  }

  goBack(): void {
    this.router.navigate(["/user-data"]);
  }
}
