import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'post/:id', component: PostComponent },
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
