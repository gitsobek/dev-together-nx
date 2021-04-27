import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article, Comment } from '../+state/article.models';
import { ArticleFacade } from '../+state/article.facade';
import { AuthFacade } from '@dev-together/auth';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dev-together-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  article$: Observable<Article>;
  comments$: Observable<Comment[]>;

  isLoggedIn$: Observable<boolean>;

  canEdit: boolean = false;
  unsubscribe$: Subject<void>;

  constructor(
    private authFacade: AuthFacade,
    private articleFacade: ArticleFacade
  ) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.article$ = this.articleFacade.article$;
    this.comments$ = this.articleFacade.comments$;

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
  }

  favorite(slug: string): void {
    this.articleFacade.setFavoriteArticle(slug);
  }

  follow(userId: string): void {
    this.articleFacade.setFollowUser(userId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
