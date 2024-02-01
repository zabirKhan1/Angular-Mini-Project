import { Component } from "@angular/core";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [CommonModule,MaterialModuleModule, ReactiveFormsModule],
  templateUrl: "./add-user.component.html",
  styleUrl: "./add-user.component.css",
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dob: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    if (this.userForm.valid) {
      console.log("Form submitted:", this.userForm.value);
    
    }
  }
}
