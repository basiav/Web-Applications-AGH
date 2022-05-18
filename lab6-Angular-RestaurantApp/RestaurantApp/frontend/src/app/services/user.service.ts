import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from '../models/user.model';
import { WebRequestsService } from './web-requests.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'users';
  readonly ROOT_URL = this.webService.ROOT_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json'
    })
  }
  bannedUsers: string[] = [];

  constructor(
    private webService: WebRequestsService,
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>(`${this.ROOT_URL}/${this.usersUrl}`)
    .pipe(
      tap(_ => this.log('fetched users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getUser(mongoId: string): Observable<User> {
    const url = `${this.usersUrl}/${mongoId}`;
    return this.http.get<User>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`fetched user mongoId=${mongoId}`),
      catchError(this.handleError<User>(`getUser mongoId=${mongoId}`)))
    );
  }

  getUserByNick(nick: string): Observable<User> {
    const url = `${this.usersUrl}/getUserByNick/${nick}`;
    return this.http.get<User>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`fetched user nick=${nick}`),
      catchError(this.handleError<User>(`getUser mongoId=${nick}`)))
    );
  }

  getAllUsersData(): Observable<any> {
    const url = `${this.usersUrl}/getUsersData/all`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
      .pipe(
        tap(_ => this.log(`got all users' data`),
          catchError(this.handleError<any>(`getAllUsersData`)))
      );
  }

  getUserRoleById(id: string): Observable<any> {
    const url = `${this.usersUrl}/getUserRole/${id}`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
      .pipe(
        tap(_ => this.log(`got user role by mongoId=${id}`),
          catchError(this.handleError<any>(`getUserRoleById mongoId=${id}`)))
      );
}

  getUserRoleByNick(nick: string): Observable<any> {
    const url = `${this.usersUrl}/getUserRoleByNick/${nick}`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
      .pipe(
        tap(_ => this.log(`got user role by nick=${nick}`),
          catchError(this.handleError<any>(`getUserRoleByNick nick=${nick}`)))
      );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(`${this.ROOT_URL}/${url}`)
    .pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.ROOT_URL}/${this.usersUrl}`, user)
    .pipe(
      tap((newUser: any) => this.log(`added user nick=${newUser.nick}`)),
      catchError(this.handleError<User>('addUser')));
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.ROOT_URL}/${this.usersUrl}`, user)
    .pipe(
      tap(_ => this.log(`updated user nick=${user.nick}`)),
      catchError(this.handleError<User>(`updateUser`))
    );
  }

  banUser(user: User): void {
    if (!this.bannedUsers.includes(user.email)) {
      this.bannedUsers.push(user.email);
    }
  }

  unbanUser(user: User): void {
    const index = this.bannedUsers.indexOf(user.email, 0);
    if (index > -1) {
      this.bannedUsers.splice(index, 1);
    }
  }

  isBanned(userEmail: string): boolean {
    return this.bannedUsers.includes(userEmail);
  }

  patchUser(user: User): Observable<any> {
    return this.http.patch<User>(`${this.ROOT_URL}/${this.usersUrl}/patchWithMail/${user.email}`, user)
    .pipe(
      tap((updatedUser: any) => this.log(`patched user nick=${updatedUser.nick}`)),
      catchError(this.handleError<User>('patchUser')));
  }

  updateRole(user: User, newRole: string) {
    let updatedUser = {
      'nick': user.nick,
      'email': user.email,
      'password': user.password,
      'role': newRole, 
    };

    this.patchUser(updatedUser)
    .subscribe(u => {
      console.log("Old user: ", user);
      console.log("Updated user: ", u);
    });
  }

  getUserIdByEmail(email: string): Observable<any> {
    const url = `${this.usersUrl}/getUserIdByEmail/${email}`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
      .pipe(
        tap(_ => this.log(`got user _id by email=${email}`),
          catchError(this.handleError<any>(`getUserIdByEmail email=${email}`)))
      );
  }

  getUserIdByNick(nick: string): Observable<any> {
    const url = `${this.usersUrl}/getUserIdByNick/${nick}`;
    return this.http.get(`${this.ROOT_URL}/${url}`)
      .pipe(
        tap(_ => this.log(`got user _id by nick=${nick}`),
          catchError(this.handleError<any>(`getUserIdByNick nick=${nick}`)))
      );
  }

    // Returns mongo object _id user, given the user's nick
    async getMongoUserId(nick: string) {
      let res;
      this.getUserByNick(nick)
      .subscribe((id: any) => {
        res = id._id;
      });
      await new Promise(f => setTimeout(f, 1000));
      return res;
    }
  
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  public log(message: string) {
    console.log(message);
  }

}
