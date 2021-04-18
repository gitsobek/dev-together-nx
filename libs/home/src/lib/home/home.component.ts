import { Component, OnInit } from '@angular/core';
import { TabSwitchConfig } from '@dev-together/ui-components';
import { BlogFacade, ListType } from '@dev-together/blog';
import { Observable } from 'rxjs';
import { AuthFacade } from '@dev-together/auth';

@Component({
  selector: 'dev-together-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tags$: Observable<string[]>;
  isLogged$: Observable<boolean>;
  selectedTag$: Observable<string>;
  isBlogLoading$: Observable<boolean>;

  readonly tabConfig: TabSwitchConfig[] = [
    {
      name: 'All',
      type: 'ALL',
    },
    {
      name: 'Personal',
      type: 'PERSONAL',
    },
  ];

  constructor(private authFacade: AuthFacade, private blogFacade: BlogFacade) {
    this.tags$ = this.blogFacade.tags$;
    this.isBlogLoading$ = this.blogFacade.isLoading$;
    this.selectedTag$ = this.blogFacade.selectedTag$;

    this.isLogged$ = this.authFacade.isLoggedIn$;
  }

  ngOnInit(): void {
    this.blogFacade.setType(this.tabConfig[0].type);
  }

  onBlogTypeSelected(type: ListType): void {
    this.blogFacade.setType(type);
  }

  onTagClick(tag: string): void {
    this.blogFacade.setTag(tag);
  }
}
