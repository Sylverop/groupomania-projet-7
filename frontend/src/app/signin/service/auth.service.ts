import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../subscribe/model/user.model';
import { CurrentUser } from '../model/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getToken() {
    let currentUser: any = localStorage.getItem('currentUser');
    return JSON.parse(currentUser)?.token;
  }

  loginUser(email: string, password: string) {
    return this.http.post<CurrentUser>(
      environment.backendServer + '/api/auth/login',
      {
        email: email,
        password: password,
      }
    );
  }

  logout() {
    this.isAuth$.next(false);
    localStorage.clear();
  }
  get isLoggedIn(): boolean {
    let currentUser: any = localStorage.getItem('currentUser');
    return currentUser !== null && currentUser !== undefined ? true : false;
  }
}
