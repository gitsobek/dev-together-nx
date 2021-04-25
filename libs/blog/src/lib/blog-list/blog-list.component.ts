import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Article } from '@dev-together/article';
import { BlogFacade } from '../+state/blog.facade';
import { Observable } from 'rxjs';
import { ArticleQuery } from '../+state/blog.models';

@Component({
  selector: 'dev-together-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  @Input() noAuthorizedType: string | null = null;
  @Input() isLogged: boolean | null = null;

  query$: Observable<ArticleQuery>;
  articles$: Observable<Article[]>;

  constructor(private blogFacade: BlogFacade) {}

  ngOnInit(): void {
    this.articles$ = this.blogFacade.articles$;
    this.query$ = this.blogFacade.query$;
  }

  navigateToArticle(slug: string) {
    this.blogFacade.navigateToArticle(slug);
  }
}
