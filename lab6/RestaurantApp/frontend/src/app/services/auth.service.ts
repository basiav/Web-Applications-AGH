import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usersRoles = new Map<string, string>();  // roles: "guest", "user", "manager", "admin"
  private storedEmailPath = "user-email";
  private storedTokenPath = "auth-token";

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
    this.logout();

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
    console.log("Logged in as: ", this.getUserRole());
    return res;
  }

  async signup(nick: string, email: string, password: string) {
    let res = false;
    this.webService.signup(nick, email, password)
    .subscribe(
      (data: any) => {
        res = true;
      },
      error => {
        console.log('Oops: ', error);
        res = error.error;
      }
    );
    await new Promise(f => setTimeout(f, 1000));

    setTimeout(() => 
      this.getAllUsersRoles()
    , 400);

    return res;
  }

  private setSession(email: string, acccessToken: string){
    localStorage.setItem(this.storedEmailPath, email);
    localStorage.setItem(this.storedTokenPath, acccessToken);
  }

  private removeSession(){
    localStorage.removeItem(this.storedEmailPath);
    localStorage.removeItem(this.storedTokenPath);
  }

  logout(){
    console.log('Logged out as ', this.getUserRole());
    this.removeSession();
  }

  get storedEmail() {
    return localStorage.getItem(this.storedEmailPath);
  }

  get storedToken() {
    return localStorage.getItem(this.storedTokenPath);
  }

  addRole(email: string, role: string): void {
    this.usersRoles.set(email, role);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storedTokenPath);
  }

  checkRole(email: string, role: string): boolean {
    return !!(this.usersRoles.has(email) && this.usersRoles.get(email) && (this.usersRoles.get(email) === role));
  }

  getUserRole(): string {
    if (this.checkRole(this.storedEmail!, "user")) {
      return "user";
    }
    if (this.checkRole(this.storedEmail!, "manager")) {
      return "manager";
    }
    if (this.checkRole(this.storedEmail!, "admin")) {
      return "admin";
    }
    return "guest";
  }

  isUserUser(): boolean {
    return this.isLoggedIn() && this.checkRole(this.storedEmail!, "user");
  }

  isUserManager(): boolean {
    return this.isLoggedIn() && this.checkRole(this.storedEmail!, "manager");
  }

  isUserAdmin(): boolean {
    return this.isLoggedIn() && this.checkRole(this.storedEmail!, "admin");
  }

  isUserBanned(): boolean {
    return this.isLoggedIn() && this.checkRole(this.storedEmail!, "user")
    && this.userService.isBanned(this.storedEmail!);
  }
}
