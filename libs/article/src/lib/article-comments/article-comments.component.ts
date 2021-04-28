import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '@dev-together/auth';
import { Field } from '@dev-together/forms';
import { Observable } from 'rxjs';
import { Article, Comment } from '../+state/article.models';

@Component({
  selector: 'dev-together-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCommentsComponent {
  @Input() isLoggedIn: boolean;
  @Input() article: Article;
  @Input() comments: Comment[];
  @Input() currentUser: User;
  @Input() data$: Observable<any>;
  @Input() form$: Observable<Field[]>;
  @Input() comment: Comment;
  @Input() isCommentsLoading$: Observable<boolean>;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  @Output() deleteComment: EventEmitter<{
    slug: string;
    commentId: number;
  }> = new EventEmitter();
  @Output() addComment: EventEmitter<string> = new EventEmitter();

  constructor() {}
}
