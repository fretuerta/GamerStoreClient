import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  emailExist: boolean = false;

  constructor(protected authService: AuthService,
              protected router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    if (form.invalid) { return; }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password)
    .then((result) => {
      this.router.navigateByUrl('login')
    })
    .catch((err) => {
      this.isLoading = false;
      if (err.status == 302) {
        this.emailExist = true;
        setTimeout(()=>{ this.emailExist = false; }, 2000)
      }
    });
  }

}
