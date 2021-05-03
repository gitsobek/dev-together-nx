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
import { FormsModule } from '@dev-together/forms';
import { Article } from './shared/article.abstract';
import { MockArticleService } from './shared/mock-article.service';
import { ArticleFacade } from './+state/article.facade';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';
import { UiElementsModule } from '@dev-together/ui-elements';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    UiElementsModule
  ],
  providers: [
    ArticleEffects,
    ArticleFacade,
    { provide: Article, useClass: MockArticleService },
    ArticleResolver,
    BLOG_ACTION_PROVIDER,
  ],
  declarations: [ArticleComponent, ArticleCommentsComponent],
})
export class ArticleModule {}
