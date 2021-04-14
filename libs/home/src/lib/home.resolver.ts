import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BlogFacade } from '@dev-together/blog';
import { Observable, of } from 'rxjs';

@Injectable()
export class HomeResolver implements Resolve<boolean> {
  constructor(private blogFacade: BlogFacade) {}

  resolve(): Observable<boolean> {
    this.blogFacade.loadTags();
    return of(true);
  }
}
