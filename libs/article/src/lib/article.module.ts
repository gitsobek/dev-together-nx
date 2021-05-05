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
import { ArticleAbstract } from './shared/article.abstract';
import { MockArticleService } from './shared/mock-article.service';
import { ArticleFacade } from './+state/article.facade';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';
import { UiElementsModule } from '@dev-together/ui-elements';
import { AddArticleComponent } from './add-article/add-article.component';
import { PublishResolver } from './publish.resolver';
import { AuthGuardService } from '@dev-together/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: 'publish',
        component: AddArticleComponent,
        resolve: { PublishResolver },
        canActivate: [AuthGuardService]
      },
      {
        path: 'publish/:slug',
        component: AddArticleComponent,
        resolve: { PublishResolver },
        canActivate: [AuthGuardService]
      },
      {
        path: ':slug',
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
    { provide: ArticleAbstract, useClass: MockArticleService },
    ArticleResolver,
    PublishResolver,
    BLOG_ACTION_PROVIDER,
  ],
  declarations: [ArticleComponent, ArticleCommentsComponent, AddArticleComponent],
})
export class ArticleModule {}
