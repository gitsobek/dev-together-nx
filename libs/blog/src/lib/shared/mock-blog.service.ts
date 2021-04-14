import { Injectable } from '@angular/core';
import { Article } from '@dev-together/article';
import { asyncScheduler, Observable, scheduled } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { ArticleQuery } from '../+state/blog.models';
import { Blog } from './blog.abstract';

@Injectable()
export class MockBlogService extends Blog {
  constructor() {
    super();
  }

  query(
    config: ArticleQuery
  ): Observable<{ articles: Article[]; count: number }> {
    const response =
      config.type === 'ALL'
        ? {
            articles: [
              {
                author: {
                  username: 'Jan Kowalski',
                  bio: null,
                  image:
                    'https://static.productionready.io/images/smiley-cyrus.jpg',
                },
                body:
                  "A precise side-by-side comparison of general and technical aspects of Angular and React. There are so many articles titled “Angular vs React”, “React vs Angular”, “Angular or React” – it is a miracle you opened this one! What these articles are missing, however, is a precise side-by-side comparison of Angular vs React. So this is what I am going to do in this blog post: to place React and Angular in direct juxtaposition. We're going to review and contrast the two JavaScript frameworks and look at each possible characteristic to make sure we don't miss even a single piece of data. In the end, I am not going to tell you which technology to choose. But I will give you enough food for thought for you to choose the technology that suits you and your project best.",
                createdAt: '2021-04-12T17:46:58.853Z',
                updatedAt: '2021-04-12T17:46:58.853Z',
                description:
                  'A precise side-by-side comparison of general and technical aspects of Angular and React.',
                favorites: 0,
                slug: 'angular-vs-react-1',
                tagList: ['Angular', 'React'],
                title: 'Angular vs React: which one to choose for your app',
              },
            ],
            count: 1,
          }
        : {
            articles: [],
            count: 0,
          };

    return scheduled([response], asyncScheduler).pipe(delay(500), take(1));
  }

  getTags(): Observable<{ tags: string[]; }> {
    const tags = [
      'Angular',
      'React',
      'Vue.js',
      'RxJS',
      'Java',
      'Kotlin',
      'Go',
      'Docker',
      'Kubernetes',
    ];

    return scheduled([{ tags }], asyncScheduler).pipe(delay(500), take(1));
  }
}
