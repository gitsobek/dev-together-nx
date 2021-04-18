import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Article } from '@dev-together/article';
import { BlogFacade } from '../+state/blog.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'dev-together-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private blogFacade: BlogFacade) {}

  ngOnInit(): void {
    this.articles$ = this.blogFacade.articles$;
  }

  setFavorite({ slug, status }: { slug: string; status: boolean }): void {
    this.blogFacade.setFavorite(slug, status);
  }

  navigateToArticle(slug: string) {
    this.blogFacade.navigateToArticle(slug);
  }
}
