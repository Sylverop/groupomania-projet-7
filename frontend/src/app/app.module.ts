import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as fr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { registerLocaleData } from '@angular/common';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SigninComponent } from './signin/signin.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MembersComponent } from './members/members.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { SecureStaticPipe } from './secure-static.pipe';
import { PostFormUpdateComponent } from './post-form-update/post-form-update.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostComponent,
    PostFormComponent,
    HeaderComponent,
    CommentComponent,
    CommentFormComponent,
    SubscribeComponent,
    SigninComponent,
    MembersComponent,
    UserinfoComponent,
    SecureStaticPipe,
    PostFormUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
