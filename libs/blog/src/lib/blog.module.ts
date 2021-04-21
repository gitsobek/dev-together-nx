import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';
import { Blog } from './shared/blog.abstract';
import { MockBlogService } from './shared/mock-blog.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  blogFeatureKey,
  blogInitialState,
  blogReducer,
} from './+state/blog.reducer';
import { BlogEffects } from './+state/blog.effects';
import { BlogFacade } from './+state/blog.facade';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(blogFeatureKey, blogReducer, {
      initialState: blogInitialState,
    }),
    EffectsModule.forFeature([BlogEffects]),
  ],
  providers: [
    BLOG_ACTION_PROVIDER,
    { provide: Blog, useClass: MockBlogService },
    BlogFacade,
  ],
  declarations: [
    BlogListItemComponent,
    BlogListComponent
  ],
  exports: [
    BlogListComponent
  ]
})
export class BlogModule {}
