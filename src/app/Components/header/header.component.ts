import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Route, Router } from '@angular/router';
import { MaterialModuleModule } from '../../Module/material-module/material-module.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModuleModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private routes: Router) {}

  headerNavigation(param: string) {
    this.routes.navigate([param]);
  }
}
