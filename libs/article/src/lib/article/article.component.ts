import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article, Comment } from '../+state/article.models';
import { ArticleFacade } from '../+state/article.facade';
import { AuthFacade, User } from '@dev-together/auth';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, first, takeUntil, tap } from 'rxjs/operators';
import { Field, FormsFacade } from '@dev-together/forms';
import { Validators } from '@angular/forms';
import { ModalService } from '@dev-together/ui-components';

const commentStructure: Field[] = [
  {
    type: 'TEXTAREA',
    name: 'comment',
    placeholder: 'Write a comment...',
    validator: [Validators.required],
    attrs: {
      rows: 3,
    },
  },
];

@Component({
  selector: 'dev-together-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article>;
  comments$: Observable<Comment[]>;
  currentUser$: Observable<User>;
  data$: Observable<any>;
  form$: Observable<Field[]>;
  isLoggedIn$: Observable<boolean>;
  isCommentsLoading$: Observable<boolean>;

  canEdit: boolean = false;
  unsubscribe$: Subject<void>;

  constructor(
    private authFacade: AuthFacade,
    private formsFacade: FormsFacade,
    private articleFacade: ArticleFacade,
    private modalService: ModalService
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.article$ = this.articleFacade.article$;
    this.comments$ = this.articleFacade.comments$;
    this.isCommentsLoading$ = this.articleFacade.isCommentsLoading$;

    this.currentUser$ = this.authFacade.user$;
    this.isLoggedIn$ = this.authFacade.isLoggedIn$;
    this.authFacade.auth$
      .pipe(
        filter((auth) => auth.loggedIn),
        (auth$) => combineLatest([auth$, this.articleFacade.articleAuthor$]),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        ([auth, author]) =>
          (this.canEdit = auth.user.username === author.username)
      );

    this.data$ = this.formsFacade.data$;
    this.form$ = this.formsFacade.form$;

    this.formsFacade.setForm(commentStructure);
    this.formsFacade.setData(null);
  }

  favorite(slug: string): void {
    this.articleFacade.setFavoriteArticle(slug);
  }

  follow(userId: string): void {
    this.articleFacade.setFollowUser(userId);
  }

  onCommentAdd(slug: string) {
    this.articleFacade.addComment(slug);
  }

  onCommentDelete(data: { slug: string; commentId: number }) {
    this.modalService
      .open({
        content: 'Are you sure you want to delete this comment?',
        showButtons: true,
      })
      .pipe(
        first(),
        tap(
          (action: boolean | null) =>
            action && this.articleFacade.deleteComment(data)
        )
      )
      .subscribe();
  }

  onFormUpdate(changes: any) {
    this.formsFacade.updateData(changes);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.articleFacade.initializeArticle();
  }
}
