import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css'],
})
export class SubscribeComponent implements OnInit {
  subscribeForm!: FormGroup;
  userCreationMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscribeForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(/[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}/)],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  onSubscribe() {
    const name = this.subscribeForm.get('name')!.value;
    const email = this.subscribeForm.get('email')!.value;
    const password = this.subscribeForm.get('password')!.value;
    this.userService
      .createUser(name, email, password)
      .pipe(
        map((data) => {
          this.userCreationMessage =
            'Utilisateur créé. Veuillez vous connecter.';
        }),
        catchError((err) => {
          this.userCreationMessage = "Impossible de créer l'utilisateur";
          return of();
        })
      )
      .subscribe();
  }
}
