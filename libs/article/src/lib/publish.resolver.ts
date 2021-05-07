import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { BlogFacade } from '@dev-together/blog';
import { Observable, of } from 'rxjs';
import { ArticleFacade } from './+state/article.facade';

@Injectable()
export class PublishResolver implements Resolve<boolean> {
  constructor(private articleFacace: ArticleFacade, private blogFacade: BlogFacade) {}

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.params['slug'];
    this.blogFacade.loadTags();

    if (slug) {
      this.articleFacace.loadArticle(slug);
    } else {
      this.articleFacace.initializeArticle();
    }

    return of(true);
  }
}
