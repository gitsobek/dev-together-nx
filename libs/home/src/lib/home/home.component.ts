import { Component, OnInit } from '@angular/core';
import { TabSwitchConfig } from '@dev-together/ui-components';
import { BlogFacade, ListType } from '@dev-together/blog';
import { Observable } from 'rxjs';

@Component({
  selector: 'dev-together-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tags$: Observable<string[]>;
  selectedTag$: Observable<string>;

  readonly tabConfig: TabSwitchConfig[] = [
    {
      name: 'All',
      type: 'all',
    },
    {
      name: 'Personal',
      type: 'personal',
    },
  ];

  constructor(private blogFacade: BlogFacade) {
    this.tags$ = this.blogFacade.tags$;
    this.selectedTag$ = this.blogFacade.selectedTag$;
  }

  ngOnInit(): void {}

  onBlogTypeSelected(type: ListType): void {
    this.blogFacade.setType(type);
  }

  onTagClick(tag: string): void {
    this.blogFacade.setTag(tag);
  }
}
