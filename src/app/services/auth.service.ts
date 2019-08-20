import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;

  private token: string = '';
  getToken() { return this.token }

  setToken(token: string, authUserName: string) {
    this.token = token;
    this.saveAuthData(token, new Date( new Date().getTime() + (1000 * 60 * 60 * 10) ), authUserName )
    this.authStatusListener.next({authenticated: true, email: authUserName});
  }
  private authStatusListener = new Subject<AuthData>();
  public userName = "";
  
  constructor(protected http: HttpClient) { }

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
      this.userName = authInformation.authUserName;
      this.authStatusListener.next({authenticated: true, email: this.userName});
    }
  }

  logout() {
    this.token = '';
    this.clearAuthData();
    this.authStatusListener.next({authenticated: false, email: ''});
  }

  private saveAuthData(token: string, expirationDate: Date, authUserName: string) {
    console.log('dia: ', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('authUserName', authUserName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('authUserName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const authUserName = localStorage.getItem('authUserName');
    if (!token || !expirationDate || !authUserName) { return; }
    return { token: token, expirationDate: new Date(expirationDate), authUserName: authUserName }
  }
}
