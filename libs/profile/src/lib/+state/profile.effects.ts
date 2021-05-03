import {
  BlogActionsService,
  BLOG_ACTION_TOKEN,
  IBlogActions,
} from '@dev-together/shared';
import { Inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as ProfileActions from './profile.actions';
import { ProfileAbstract } from '../shared/profile.abstract';
import { FormsFacade } from '@dev-together/forms';
import { SnackbarService } from '@dev-together/ui-components';
import { ProfileFacade } from './profile.facade';

@Injectable()
export class ProfileEffects {
  getProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.getProfile),
      map((action) => action.id),
      switchMap((id) =>
        this.profileService.getProfile(id).pipe(
          map((profile) => ProfileActions.getProfileSuccess({ profile })),
          catchError((error) => of(ProfileActions.getProfileFail({ error })))
        )
      )
    )
  );

  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.editProfile),
      withLatestFrom(this.formsFacade.data$, this.profileFacade.profile$),
      map(([_, data, user]) => ({
        ...user,
        ...data,
      })),
      switchMap((data) =>
        this.profileService.updateProfile(data).pipe(
          switchMap((response) =>
            this.snackbarService.show(response.message).pipe(map(() => response))
          ),
          map((response) =>
            ProfileActions.editProfileSuccess({ profile: response.profile })
          ),
          catchError((error) => of(ProfileActions.editProfileFail(error)))
        )
      )
    )
  );

  setFollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.setFollow),
      map((action) => action.id),
      concatMap((id) =>
        this.blogActionsService.followUser(id).pipe(
          map((response) =>
            ProfileActions.setFollowSuccess({ profile: response.profile })
          ),
          catchError((error) => of(ProfileActions.setFollowFail({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private formsFacade: FormsFacade,
    private profileFacade: ProfileFacade,
    private profileService: ProfileAbstract,
    private snackbarService: SnackbarService,
    @Inject(BLOG_ACTION_TOKEN) private blogActionsService: IBlogActions
  ) {}
}
