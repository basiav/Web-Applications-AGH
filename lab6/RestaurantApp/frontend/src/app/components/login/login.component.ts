import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alertMessage: string = "Alert!";
  showAlert: boolean = false;
  
  constructor(
    // private authService: AuthService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email: string, password: string){
    // this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
    //   this.router.navigate(['home']);
    //   console.log(res);
    // });
    // console.log("email: ", email, " password: ", password);
    this.showAlert = true;
  }

  close(): void {
    this.showAlert = !this.showAlert;
  }
}
