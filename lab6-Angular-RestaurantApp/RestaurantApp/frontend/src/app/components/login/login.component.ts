import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertMessage: string | boolean = "Alert!";
  showAlert: boolean = false;
  
  constructor(
    private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  async onLoginButtonClicked(email: string, password: string){
    let loggedIn: boolean = await this.authService.login(email, password);
    console.log("RESULT: ", loggedIn)
    if (loggedIn && loggedIn == true) {
      console.log("Logged in!");
      this.router.navigate(['home']);
    } else {
      this.alertMessage = loggedIn;
      this.showAlert = true;
    }
  }

  close(): void {
    this.showAlert = !this.showAlert;
  }
}
