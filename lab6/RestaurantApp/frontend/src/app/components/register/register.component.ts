import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alertMessage: string | boolean = "Alert!";
  showAlert: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  async onRegisterButtonClicked(nick: string, email: string, password: string, repeatPassword: string) {
    if (password === repeatPassword) {
      let registered: boolean = await this.authService.signup(nick, email, password);
      console.log("RESULT: ", registered)
      if (registered && registered == true) {
        console.log("Register successful! Now please log in");
        this.router.navigate(['login-page']);
      } else {
        this.alertMessage = registered;
        this.showAlert = true;
      }
    }
    console.log("nick", nick, "email: ", email, " password: ", password);
    this.showAlert = true;
  }

  wrongPasswords(password1: string, password2: string){
    return !(password1 == password2);
  }

  close(): void {
    this.showAlert = !this.showAlert;
  }
}
