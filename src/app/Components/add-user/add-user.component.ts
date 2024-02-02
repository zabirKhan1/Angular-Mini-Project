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
import { addUser } from "../../Store/actions/userList.action";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [CommonModule, MaterialModuleModule, ReactiveFormsModule],
  templateUrl: "./add-user.component.html",
  styleUrl: "./add-user.component.css",
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: Router
  ) {
    this.userForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      company: ["", Validators.required],
      address: ["", Validators.required],
      dob: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.userForm.valid) {
      this.store.dispatch(addUser(this.userForm.value));
      this.route.navigate(["user-data"]);
    }
  }
}
