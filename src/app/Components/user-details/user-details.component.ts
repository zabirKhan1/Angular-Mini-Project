import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModuleModule } from '../../Module/material-module/material-module.module';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MaterialModuleModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // Hardcoded user object
    this.user = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      dob: '1990-01-01',
      address: '123 Main St, Anytown, USA',
      company: 'Acme Corporation'
    };
  }

  goBack(): void {
    this.router.navigate(['/user-data']);
  }

}
