import { Observable, of } from 'rxjs';
import { StoreModule, Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import * as BlogActions from './blog.actions';
import { BlogEffects } from './blog.effects';
import { Blog } from '../shared/blog.abstract';
import {
  BLOG_ACTION_TOKEN,
  IBlogActions,
  MockBlogActionsService,
} from '@dev-together/shared';
import { BlogFacade } from './blog.facade';
import { Article } from '@dev-together/article';

describe('BlogEffects', () => {
  let actions$: Observable<Action>;
  let effects: BlogEffects;
  let service: Blog;
  let blogFacade: BlogFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        BlogEffects,
        provideMockActions(() => actions$),
        {
          provide: Blog,
          useValue: {
            query: jest.fn(),
            getTags: jest.fn(),
          },
        },
        {
          provide: BlogFacade,
          useValue: {
            query$: cold('a', {
              a: {
                type: 'ALL',
                pageIndex: 1,
                filters: {
                  tag: 'All',
                  limit: 10,
                },
              },
            }),
          },
        }
      ],
    });

    effects = TestBed.inject(BlogEffects);
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(Blog);
    blogFacade = TestBed.inject(BlogFacade);
  });

  describe('loadArticles$', () => {
    it('should dispatch a LoadArticlesSuccess action when service call succeeds', () => {
      const singleArticle: Article = {
        author: {
          id: '1',
          username: 'Piotr Sobuś',
          bio: null,
          image:
            'https://miro.medium.com/fit/c/262/262/2*N3XfPb2_Vs2dZpqDwkUFzA.jpeg',
          following: false,
        },
        body:
          "A precise side-by-side comparison of general and technical aspects of Angular and React. There are so many articles titled “Angular vs React”, “React vs Angular”, “Angular or React” – it is a miracle you opened this one! What these articles are missing, however, is a precise side-by-side comparison of Angular vs React. So this is what I am going to do in this blog post: to place React and Angular in direct juxtaposition. We're going to review and contrast the two JavaScript frameworks and look at each possible characteristic to make sure we don't miss even a single piece of data. In the end, I am not going to tell you which technology to choose. But I will give you enough food for thought for you to choose the technology that suits you and your project best.",
        createdAt: '2021-04-12T17:46:58.853Z',
        updatedAt: '2021-04-12T17:46:58.853Z',
        description:
          'A precise side-by-side comparison of general and technical aspects of Angular and React.',
        favorites: 0,
        favorited: false,
        slug: 'angular-vs-react-1',
        tags: ['Angular', 'React'],
        title: 'Angular vs React: which one to choose for your app',
      };

      const loadArticlesAction = BlogActions.loadArticles();
      const loadArticlesSuccessAction = BlogActions.loadArticlesSuccess({
        articles: [singleArticle],
        count: 1,
      });

      actions$ = hot('-a---', { a: loadArticlesAction });
      const response = cold('-a|', {
        a: { articles: [singleArticle], count: 1 },
      });
      const expected = cold('--b', { b: loadArticlesSuccessAction });

      service.query = jest.fn(() => response);

      expect(effects.loadArticles$).toBeObservable(expected);
    });

    it('should dispatch a LoadArticlesFail when service call fails', () => {
      const result = {
        code: 500,
        message: 'An error has occurred while fetching articles.',
      };

      const loadArticlesAction = BlogActions.loadArticles();
      const loadArticlesSuccessAction = BlogActions.loadArticlesFail({
        error: result,
      });

      actions$ = hot('-a---', { a: loadArticlesAction });
      const response = cold('-#', null, result);
      const expected = cold('--b', { b: loadArticlesSuccessAction });
      service.query = jest.fn(() => response);
      expect(effects.loadArticles$).toBeObservable(expected);
    });
  });
});
