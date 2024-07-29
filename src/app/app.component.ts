import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  user: User[] = [];
  title = 'My First Project';
  constructor(private router: Router) {}

  async goToUsers() {
    await this.router.navigate(['users']);
  }
  async goToHome() {
    await this.router.navigate(['']);
  }
}
