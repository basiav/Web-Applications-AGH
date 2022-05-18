import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestsService {
  readonly ROOT_URL;

  constructor() { 
    this.ROOT_URL = 'http://localhost:3000';
  }
  
}
