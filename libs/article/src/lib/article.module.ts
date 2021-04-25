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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticleComponent,
        resolve: ArticleResolver,
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
    { provide: Article, useClass: MockArticleService },
    ArticleResolver,
    ArticleEffects,
  ],
  declarations: [ArticleComponent],
})
export class ArticleModule {}
