import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BlogListComponent } from './blog-list.component';
import { BlogListItemComponent } from '../blog-list-item/blog-list-item.component';
import { BlogFacade } from '../+state/blog.facade';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  const singleArticle = {
    author: {
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [BlogListComponent, BlogListItemComponent],
      providers: [
        {
          provide: BlogFacade,
          useValue: {
            query$: cold('a', { a: { type: 'ALL' } }),
            articles$: cold('a', { a: [singleArticle, singleArticle] }),
          },
        },
      ],
    });
  });

  it("should show warning if not logged for 'PERSONAL' type", () => {
    TestBed.overrideProvider(BlogFacade, {
      useValue: {
        query$: cold('a', { a: { type: 'PERSONAL' } }),
        articles$: cold('a', { a: [] }),
      },
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    component.noAuthorizedType = 'PERSONAL';
    const blog: DebugElement = fixture.debugElement;

    component.isLogged = false;

    component.ngOnInit();
    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    const warning: HTMLElement = blog.query(By.css('.warning')).nativeElement;

    expect(warning.textContent).toEqual(
      'Please login or register in order to manage your articles.'
    );
  });

  it("should show warning for 'ALL' type on empty articles array", () => {
    TestBed.overrideProvider(BlogFacade, {
      useValue: {
        query$: cold('a', { a: { type: 'ALL' } }),
        articles$: cold('a', { a: [] }),
      },
    });

    TestBed.compileComponents();
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    component.noAuthorizedType = 'PERSONAL';

    const blog: DebugElement = fixture.debugElement;

    component.isLogged = true;
    component.articles$ = cold('a', { a: [] });

    component.ngOnInit();
    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    const warning: HTMLElement = blog.query(By.css('.warning')).nativeElement;

    expect(warning.textContent).toEqual('-No articles to show-');
  });

  it("should show articles for 'ALL' type", fakeAsync(() => {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    component.noAuthorizedType = 'PERSONAL';
    const blog: DebugElement = fixture.debugElement;

    component.isLogged = true;
    component.ngOnInit();
    fixture.detectChanges();

    getTestScheduler().flush();
    fixture.detectChanges();

    tick();

    getTestScheduler().flush();
    fixture.detectChanges();

    const list: DebugElement[] = blog.queryAll(
      By.css('dev-together-blog-list-item')
    );

    expect(list.length).toEqual(2);
  }));
});
