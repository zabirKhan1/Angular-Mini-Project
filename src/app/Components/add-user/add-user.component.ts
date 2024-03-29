import { Component } from "@angular/core";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import {
  addUser,
  loadUsersDataById,
  updateUser,
} from "../../Store/actions/userList.action";
import { ActivatedRoute, Router } from "@angular/router";
import { selectUserById } from "../../Store/selector/userList.selector";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [CommonModule, MaterialModuleModule, ReactiveFormsModule],
  templateUrl: "./add-user.component.html",
  styleUrl: "./add-user.component.css",
})
export class AddUserComponent {
  userForm: FormGroup;
  userId: string | undefined | null;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      company: ["", Validators.required],
      address: ["", Validators.required],
      dob: ["", Validators.required],
      createdAt: [""],
      updatedAt: [""],
    });
  }

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get("id");
    const today = new Date();
    const formattedDate = today.toISOString();
    if (this.userId) {
      this.store.dispatch(loadUsersDataById({ code: this.userId }));
      this.store.select(selectUserById).subscribe((user) => {
        this.userForm.setValue({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          company: user.company,
          address: user.address,
          dob: user.dob,
          createdAt: user.createdAt,
          updatedAt: formattedDate,
        });
      });
    } else {
      this.userForm.setValue({
        ...this.userForm.value,
        createdAt: formattedDate,
        updatedAt: formattedDate,
      });
    }
  }

  submitForm() {
    if (this.userForm.valid) {
      if (this.userId) {
        this.store.dispatch(
          updateUser({ user: this.userForm.value, id: this.userId })
        );
      } else {
        this.store.dispatch(addUser(this.userForm.value));
      }
    }
    this.route.navigate(["user-data"]);
  }
  navigateBack() {
    this.route.navigate(["/user-data"]);
  }
}
