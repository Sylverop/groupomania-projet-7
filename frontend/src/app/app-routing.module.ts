import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SigninComponent } from './signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { PostFormUpdateComponent } from './post-form-update/post-form-update.component';

const routes: Routes = [
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'posts', component: PostListComponent, canActivate: [AuthGuard] },
  {
    path: 'modifyPost/:id',
    component: PostFormUpdateComponent,
    canActivate: [AuthGuard],
  },
  { path: 'post/:id', component: PostComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
