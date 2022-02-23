import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersRoles = new Map<string, string>();

  constructor(private userService: UserService) {
    this.userService.getAllUsersRoles()
    .subscribe(roles => {
      roles.forEach((emailRole: { email: string; role: string; }) => {
        this.addRole(emailRole.email, emailRole.role);
      });
    });
  }

  addRole(email: string, role: string): void {
    this.usersRoles.set(email, role);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  checkRole(email: string, role: string): boolean {
    return !!(this.usersRoles.has(email) && this.usersRoles.get(email) && (this.usersRoles.get(email)?.localeCompare(role)));
  }

  isUserGuest(email: string): boolean {
    return this.checkRole(email, "guest");
  }

  isUserManager(email: string): boolean {
    return this.checkRole(email, "manager");
  }

  isUserAdmin(email: string): boolean {
    return this.checkRole(email, "admin");
  }

  getUserRole(email: string): string | null{
    if (this.isUserGuest(email)) {
      return "guest";
    }
    if (this.isUserManager(email)) {
      return "manager";
    }
    if (this.isUserAdmin(email)) {
      return "admin";
    }
    return null;
  }
}
