import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alertMessage: string = "Alert!";
  showAlert: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterButtonClicked(nick: string, email: string, password: string){
    // this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
    //   this.router.navigate(['home']);
    //   console.log(res);
    // });
    console.log("nick", nick, "email: ", email, " password: ", password);
    this.showAlert = true;
  }

  close(): void {
    this.showAlert = !this.showAlert;
  }
}
