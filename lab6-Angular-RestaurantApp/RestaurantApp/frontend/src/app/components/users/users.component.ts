import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: User[];
  availableRoles = ["user", "manager", "admin"];
  role!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService
    ) {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users;
    })
  }

  ngOnInit(): void {
  }

  banUser(user: User): void {
    this.userService.banUser(user);
  }

  unbanUser(user: User): void {
    this.userService.unbanUser(user);
  }

  setRole(user: User, newRole: string): void {
    this.userService.updateRole(user, newRole);

    setTimeout(() => {
      this.authService.getAllUsersData()
    }, 200);

    setTimeout(() => {
      this.getUsers();
    }, 700);
  }
}
