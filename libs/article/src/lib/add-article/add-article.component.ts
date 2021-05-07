import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { BlogFacade } from '@dev-together/blog';
import { Field, FormsFacade } from '@dev-together/forms';
import { ModalService } from '@dev-together/ui-components';
import { Observable, Subject } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { ArticleFacade } from '../+state/article.facade';
import { Article } from '../+state/article.models';

const editorStructure: Field[] = [
  {
    type: 'INPUT',
    name: 'title',
    placeholder: "What's the title?",
    validator: [Validators.required],
  },
  {
    type: 'INPUT',
    name: 'description',
    placeholder: "What's this article about?",
    validator: [Validators.required],
  },
  {
    type: 'TEXTAREA',
    name: 'body',
    placeholder: 'Write your article...',
    validator: [Validators.required],
  },
  {
    type: 'DROP_DOWN_INPUT',
    name: 'tags',
    placeholder: 'Place your tags...',
    defaultValue: [],
    validator: [],
  },
];

@Component({
  selector: 'dev-together-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddArticleComponent implements OnInit {
  article: Article;
  form$: Observable<Field[]>;
  data$: Observable<any>;
  isPublishing$: Observable<boolean>;

  private unsubscribe$: Subject<void>;

  constructor(
    private formsFacade: FormsFacade,
    private blogFacade: BlogFacade,
    private modalService: ModalService,
    private articleFacade: ArticleFacade,
    private cdr: ChangeDetectorRef
  ) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.blogFacade.tags$
      .pipe(
        filter(v => v && v.length > 1),
        first(),
        map((tags) => {
          const _tags = tags.filter((t) => t !== 'All');
          const [lastItem] = editorStructure.slice(-1);
          return [
            ...editorStructure.slice(0, -1),
            { ...lastItem, itemsToSelect: _tags },
          ];
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((structure: Field[]) => this.formsFacade.setForm(structure));

    this.data$ = this.formsFacade.data$;
    this.form$ = this.formsFacade.form$;
    this.isPublishing$ = this.articleFacade.isPublishing$;

    this.articleFacade.article$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((article) => {
        this.article = article;
        this.formsFacade.setData({
          title: article.title,
          description: article.description,
          body: article.body,
          tags: article.tags
        });
        this.cdr.detectChanges();
      });
  }

  onFormUpdate(changes: any): void {
    this.formsFacade.updateData(changes);
  }

  submit(): void {
    this.articleFacade.publishArticle();
  }

  delete(slug: string): void {
    this.modalService
      .open({
        content: 'Are you sure you want to delete this article?',
        showButtons: true,
      })
      .pipe(
        first(),
        tap(
          (action: boolean | null) =>
            action && this.articleFacade.deleteArticle(slug)
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.formsFacade.initializeForm();
  }
}
