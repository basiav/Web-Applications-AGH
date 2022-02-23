import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/auth/login`, {
      email: email,
      password: password
    });
  }
  
}
