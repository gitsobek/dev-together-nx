import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ArticleFacade } from './+state/article.facade';

@Injectable()
export class ArticleResolver implements Resolve<boolean> {
  constructor(private articleFacace: ArticleFacade) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.articleFacace.loadArticle(slug);

    return this.articleFacace.isArticleLoaded$.pipe(
      filter((loaded) => loaded),
      take(1),
      tap(() => this.articleFacace.loadComments(slug))
    );
  }
}
