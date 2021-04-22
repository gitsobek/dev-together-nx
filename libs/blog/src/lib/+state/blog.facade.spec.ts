import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { BlogFacade } from './blog.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromBlog from './blog.reducer';
import { cold } from 'jasmine-marbles';

describe('BlogFacade', () => {
  let service: BlogFacade;
  let store: MockStore<fromBlog.BlogState>;

  const initialState: fromBlog.BlogState = {
    blog: {
      query: {
        type: 'ALL',
        pageIndex: 1,
        filters: {
          limit: 10,
        },
      },
      articles: {
        entities: [],
        count: 120,
        loaded: true,
        loading: true,
        hasError: false,
      },
      tags: [],
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BlogFacade, provideMockStore({ initialState })] });

    store = TestBed.inject(MockStore);
    service = TestBed.inject(BlogFacade);
  });

  it('#totalPages should return 12 (120 / 10 = 12)', () => {
      const expected = cold('a', { a: 12 });

      expect(service.totalPages$).toBeObservable(expected);
  });
});
