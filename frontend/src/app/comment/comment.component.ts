import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Comment } from './model/comment.model';
import { CommentService } from './service/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input()
  comment!: Comment;

  constructor(private commentService: CommentService) {}

  notifierSubscription: Subscription =
    this.commentService.commentTopic.subscribe((notified) => {
      this.ngOnInit();
    });

  async ngOnInit() {}
}
