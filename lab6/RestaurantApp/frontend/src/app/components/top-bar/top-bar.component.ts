import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isManager(): boolean {
    return this.authService.isUserManager();
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
