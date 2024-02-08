import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MaterialModuleModule } from "../../Module/material-module/material-module.module";

@Component({
  selector: "app-dialog-box",
  templateUrl: "./dialog-box.component.html",
  standalone: true,
  imports: [MaterialModuleModule],
  styleUrls: ["./dialog-box.component.css"],
})
export class DialogBoxComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
