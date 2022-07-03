import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { PostListService } from '../post-list/service/post-list.service';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm!: FormGroup;
  userId!: string;
  userUnLoginMessage: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private postListService: PostListService,
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
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.router.navigate(['/posts']).then(() => {
            // TODO : remplacer par evenement
            window.location.reload();
            this.userUnLoginMessage = 'Utilisateur authentifier';
          });
        }),
        catchError((err) => {
          this.userUnLoginMessage = "Impossible d'authentifier l'utilisateur";
          return of();
        })
      )
      .subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
