import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Post } from '../post/models/post.model';
import { DateHelper } from '../shared/date.helper';

import { AuthService } from '../signin/service/auth.service';

import { PostFormUpdateService } from './service/post-form-update.service';

@Component({
  selector: 'app-post-form-update',
  templateUrl: './post-form-update.component.html',
  styleUrls: ['./post-form-update.component.css'],
})
export class PostFormUpdateComponent implements OnInit {
  post!: Post;
  postForm!: FormGroup;
  postImage!: string;
  imagePreview!: string;
  errorMsg!: string;
  submitted = false;

  constructor(
    private postFormUpdateService: PostFormUpdateService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let postId: string = '0';
    this.route.params.subscribe((params) => {
      postId = params['id'];
      this.postImage = environment.backendServer + '/' + this.post.imageUrl;
    });

    this.postFormUpdateService.getPostById(postId).subscribe((data) => {
      console.log(data);
      this.post = data;
    });

    console.log(this.post);
  }
  initUpDateForm(post: Post) {
    this.postForm = this.formBuilder.group({
      message: [post.message, Validators.required],
      imageUrl: [post.imageUrl, Validators.required],
    });
    this.imagePreview = this.post.imageUrl;
  }
  isPostToday() {
    return DateHelper.isToday(this.post.date);
  }

  onUpdateSubmit() {
    this.submitted = true;
    if (this.postForm.valid) {
      const formData = new FormData();
      formData.append('message', this.postForm.get('postContent')?.value);
      formData.append('image', this.postForm.get('fileSource')?.value);

      this.postFormUpdateService.updatePost(formData).subscribe((success) => {
        this.postForm.reset();
      });
    }
  }
}
