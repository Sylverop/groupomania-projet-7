import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../subscribe/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser!: User;
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getToken() {
    let token: any = localStorage.getItem('token');
    return JSON.parse(token);
  }

  loginUser(email: string, password: string) {
    return this.http.post<{ userId: string; token: string }>(
      environment.backendServer + '/api/auth/login',
      { email: email, password: password }
    );
  }

  logout() {
    this.isAuth$.next(false);
    localStorage.clear();
  }
}
