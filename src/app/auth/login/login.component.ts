import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  emailError = false;
  passwError = false;

  constructor(protected authService: AuthService,
    protected router: Router) { }
    
  onLogin(form: NgForm) {
    if (form.invalid) { return; }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password)
    .then((result) => {
      let tokenText = JSON.stringify(result);
      if (tokenText != null && tokenText != undefined && tokenText != '' ) {
        this.authService.setToken(tokenText, form.value.email);
        this.router.navigateByUrl('');
      }
    })
    .catch((err) => {
      this.isLoading = false;
      if (err.status == 200) {
        let tokenText = err.error.text;
        if (tokenText != null && tokenText != undefined && tokenText != '' ) {
          this.authService.setToken(tokenText, form.value.email);
          this.router.navigateByUrl('');
        }
      }
      if (err.status == 404) {
        this.emailError = true;
        setTimeout(()=>{ this.emailError = false; }, 2000)
      }
      if (err.status == 401) {
        this.passwError = true;
        setTimeout(()=>{ this.passwError = false; }, 2000)
      }
    });
  }
}
