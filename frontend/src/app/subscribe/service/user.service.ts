import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(name: string, email: string, password: string) {
    return this.http.post<any>(environment.backendServer + '/api/auth/signup', {
      name: name,
      email: email,
      password: password,
    });
  }

  getUser(id: string) {
    return this.http.get(environment.backendServer + '/api/users/' + id);
  }
}
