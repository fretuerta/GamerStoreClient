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
    this.saveAuthData(token, new Date( new Date().getTime() + (1000 * 60 * 60 * 10) ) )
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

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (authInformation && authInformation.expirationDate > new Date()) {
      this.token = authInformation.token;
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.clearAuthData();
    this.authStatusListener.next(false);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    console.log('dia: ', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) { return; }
    return { token: token, expirationDate: new Date(expirationDate) }
  }
}
