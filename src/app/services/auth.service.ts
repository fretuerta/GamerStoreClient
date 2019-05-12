import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthData } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  private token: string;
  getToken() { return this.token }
  setToken(token: string) {
    this.token = token;
    this.authStatusListener.next(true);
  }
  private authStatusListener = new Subject<boolean>();
  
  constructor(protected http: Http) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    let usuario: AuthData = { email: email, password: password }
    return this.http.post(this.baseUrl + 'guardausuario', usuario).toPromise();
  }

  login(email: string, password: string) {
    let usuario: AuthData = { email: email, password: password }
    return this.http.post(this.baseUrl + 'login', usuario).toPromise(); 
  }

  logout() {
    this.token = "";
    this.authStatusListener.next(false);
  }
}
