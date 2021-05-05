import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticleFacade } from './+state/article.facade';

@Injectable()
export class PublishResolver implements Resolve<boolean> {
  constructor(private articleFacace: ArticleFacade) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];

    if (slug) {
      this.articleFacace.loadArticle(slug);
    }

    return of(true);
  }
}
