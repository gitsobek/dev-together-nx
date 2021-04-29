import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ArticleResolver } from './article.resolver';
import { ArticleFacade } from '..';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';

@Component({
  selector: 'app-test-comp',
  template: '',
})
class TestComponent {}

describe('AuthGuardService', () => {
  let resolver: ArticleResolver;
  let facade: ArticleFacade;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'login',
            component: TestComponent,
          },
        ]),
      ],
      providers: [
        ArticleResolver,
        {
          provide: ArticleFacade,
          useValue: {
            isArticleLoaded$: cold('1ms a', { a: true }),
            loadArticle: jest.fn(),
            loadComments: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                slug: '123',
              },
            },
          },
        },
      ],
    });
    resolver = TestBed.inject(ArticleResolver);
    facade = TestBed.inject(ArticleFacade);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should return true if user authenticated', () => {
    resolver.resolve(route.snapshot).subscribe((v) => {
      expect(v).toBe(true);
    });
  });
});
