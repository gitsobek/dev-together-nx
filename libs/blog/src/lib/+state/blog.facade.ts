import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BlogActions from './blog.actions';
import { blogQuery } from './blog.selectors';
import { withLatestFrom, map } from 'rxjs/operators';
import { BlogState } from './blog.reducer';
import { ArticleQuery, ListType } from './blog.models';
import { go } from '@dev-together/router';

@Injectable()
export class BlogFacade {
  query$ = this.store.select(blogQuery.getQuery);
  tags$ = this.store.select(blogQuery.getTags);
  selectedTag$ = this.store.select(blogQuery.getSelectedTag);
  articles$ = this.store.select(blogQuery.getArticles);
  articlesCount$ = this.store.select(blogQuery.getArticlesCount);
  isLoading$ = this.store.select(blogQuery.isLoading);
  isError$ = this.store.select(blogQuery.isError);
  totalPages$ = this.articlesCount$.pipe(
    withLatestFrom(this.query$),
    map(([count, query]) => Math.ceil(count / query.filters.limit))
  );

  constructor(private store: Store<BlogState>) {}

  loadTags() {
    this.store.dispatch(BlogActions.loadTags());
  }

  setPage(page: number) {
    this.store.dispatch(BlogActions.setArticlesPage({ pageIndex: page }));
  }

  setQuery(query: ArticleQuery) {
    this.store.dispatch(BlogActions.setArticlesQuery({ query }));
  }

  setTag(tag: string) {
    this.store.dispatch(BlogActions.setArticlesTag({ tag }));
  }

  setType(type: ListType) {
    this.store.dispatch(BlogActions.setArticlesType({ listType: type }));
  }

  setFavorite(slug: string, status: boolean) {
    this.store.dispatch(BlogActions.setFavoriteArticle({ slug, status }));
  }

  navigateToArticle(slug: string) {
    this.store.dispatch(go({ to: { path: ['/article', slug] } }));
  }
}
