import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileAbstract } from './shared/profile.abstract';
import { MockProfileService } from './shared/mock-profile.service';
import { RouterModule } from '@angular/router';
import {
  AuthGuardService,
  LocalStorageService,
  StorageService,
} from '@dev-together/auth';
import { StoreModule } from '@ngrx/store';
import {
  profileFeatureKey,
  profileInitialState,
  profileReducer,
} from './+state/profile.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileResolver } from './profile.resolver';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';
import { ProfileEffects } from './+state/profile.effects';
import { ProfileFacade } from './+state/profile.facade';
import { BlogModule } from '@dev-together/blog';
import { UiElementsModule } from '@dev-together/ui-elements';
import { SnackbarService, UiComponentsModule } from '@dev-together/ui-components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BlogModule,
    UiElementsModule,
    UiComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        resolve: { ProfileResolver },
        canActivate: [AuthGuardService],
      },
    ]),
    StoreModule.forFeature(profileFeatureKey, profileReducer, {
      initialState: profileInitialState,
    }),
    EffectsModule.forFeature([ProfileEffects]),
  ],
  providers: [
    {
      provide: ProfileAbstract,
      useClass: MockProfileService,
    },
    {
      provide: StorageService,
      useClass: LocalStorageService,
    },
    ProfileResolver,
    ProfileEffects,
    ProfileFacade,
    BLOG_ACTION_PROVIDER,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
