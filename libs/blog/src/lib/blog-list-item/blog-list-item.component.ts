import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Article } from '@dev-together/article';

@Component({
  selector: 'dev-together-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListItemComponent {
  @Input() article: Article;
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();
}
