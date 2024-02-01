import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormField } from "@angular/material/form-field";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormField,
    MatToolbar,
    MatIcon,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormField,
    MatToolbar,
    MatIcon,
  ],
})
export class MaterialModuleModule {}
