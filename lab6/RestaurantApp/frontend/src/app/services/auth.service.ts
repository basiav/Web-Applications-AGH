import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { UserService } from './user.service';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersRoles = new Map<string, string>();  // roles: "guest", "user", "manager", "admin"
  private storedEmail = "user-email";
  private storedToken = "auth-token";

  constructor(
    private userService: UserService,
    private webService: WebRequestsService
  ) {
    this.getAllUsersRoles();
  }

  getAllUsersRoles(): void {
    this.userService.getAllUsersRoles()
    .subscribe(roles => {
      roles.forEach((emailRole: { email: string; role: string; }) => {
        this.addRole(emailRole.email, emailRole.role);
      });
    });
  }

  async login(email: string, password: string) {
    let res = false;
    this.webService.login(email, password)
    .subscribe(
      (data: any) => {
        this.setSession(email, data.token);
        res = true;
      },
      error => {
        console.log('Oops: ', error);
        res = error.error;
      }
    );
    await new Promise(f => setTimeout(f, 1000));
    return res;
  }

  async signup(nick: string, email: string, password: string) {
    let res = false;
    this.webService.signup(nick, email, password)
    .subscribe(
      (data: any) => {
        console.log("success: ", data);
        res = true;
      },
      error => {
        console.log('Oops: ', error);
        res = error.error;
      }
    );
    await new Promise(f => setTimeout(f, 1000));
    return res;
  }

  private setSession(email: string, acccessToken: string){
    localStorage.setItem(this.storedEmail, email);
    localStorage.setItem(this.storedToken, acccessToken);
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

  getUserRole(email: string): string {
    if (this.isUserUser(email)) {
      return "guest";
    }
    if (this.isUserManager(email)) {
      return "manager";
    }
    if (this.isUserAdmin(email)) {
      return "admin";
    }
    return "guest";
  }

  isUserUser(email: string): boolean {
    return this.checkRole(email, "guest");
  }

  isUserManager(email: string): boolean {
    return this.checkRole(email, "manager");
  }

  isUserAdmin(email: string): boolean {
    return this.checkRole(email, "admin");
  }
}
