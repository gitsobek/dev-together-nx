import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article/article.component';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ArticleResolver } from './article.resolver';
import {
  articleFeatureKey,
  articleInitialState,
  articleReducer,
} from './+state/article.reducer';
import { ArticleEffects } from './+state/article.effects';
import { FormsModule } from '@angular/forms';
import { Article } from './shared/article.abstract';
import { MockArticleService } from './shared/mock-article.service';
import { ArticleFacade } from './+state/article.facade';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ArticleComponent,
        resolve: { ArticleResolver },
      },
    ]),
    StoreModule.forFeature(articleFeatureKey, articleReducer, {
      initialState: articleInitialState,
    }),
    EffectsModule.forFeature([ArticleEffects]),
    FormsModule,
  ],
  providers: [
    ArticleEffects,
    ArticleFacade,
    { provide: Article, useClass: MockArticleService },
    ArticleResolver,
    ArticleEffects,
    BLOG_ACTION_PROVIDER,
  ],
  declarations: [ArticleComponent],
})
export class ArticleModule {}
