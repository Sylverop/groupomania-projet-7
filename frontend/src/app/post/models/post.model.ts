import { Comment } from 'src/app/comment/model/comment.model';

export class Post {
  _id!: string;
  date!: Date;
  authorName!: String;
  imageUrl!: string;
  message!: string;
  comments!: Array<Comment>;
  likers!: Array<String>;
}
