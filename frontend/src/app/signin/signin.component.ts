import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { User } from '../subscribe/model/user.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.authService
      .loginUser(email, password)
      .pipe(
        map((data) => {
          localStorage.setItem('userId', JSON.stringify(data.userId));
          localStorage.setItem('token', JSON.stringify(data.token));
          this.router.navigate(['/posts']);
        })
      )
      .subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
