import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { AuthService } from '../signin/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.getToken()) this.isAuth = true;
  }

  onLogout() {
    this.authService.logout();
    this.isAuth = false;
    this.router.navigate(['/signin']);
  }
}
