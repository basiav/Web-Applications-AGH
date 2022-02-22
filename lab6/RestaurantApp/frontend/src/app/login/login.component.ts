import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
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
    console.log("email: ", email, " password: ", password);
  }
}
