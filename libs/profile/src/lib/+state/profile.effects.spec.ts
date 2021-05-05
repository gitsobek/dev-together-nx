import { Observable, of } from 'rxjs';
import { StoreModule, Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import * as ProfileActions from './profile.actions';
import { BLOG_ACTION_PROVIDER } from '@dev-together/shared';
import { ProfileEffects } from './profile.effects';
import { FormsFacade } from '@dev-together/forms';
import { ProfileFacade } from './profile.facade';
import { ProfileAbstract } from '../shared/profile.abstract';

describe('ProfileEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProfileEffects;
  let service: ProfileAbstract;
  let formsFacade: FormsFacade;
  let profileFacade: ProfileFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        ProfileEffects,
        provideMockActions(() => actions$),
        {
          provide: ProfileAbstract,
          useValue: {
            updateProfile: jest.fn(),
          },
        },
        {
          provide: FormsFacade,
          useValue: {
            data$: cold('a', {
              a: {
                bio: 'this is my bio',
                image: 'https://myimage.com',
              },
            }),
          },
        },
        {
          provide: ProfileFacade,
          useValue: {
            profile$: cold('a', {
              a: {
                id: '1',
                username: 'Jan Kowalski',
                bio: null,
                image: 'https://www.w3schools.com/w3css/img_avatar3.png',
                following: false,
                joinedAt: '2021-04-10T17:46:58.853Z',
              },
            }),
          },
        },
        BLOG_ACTION_PROVIDER,
      ],
    });

    effects = TestBed.inject(ProfileEffects);
    actions$ = TestBed.inject(Actions);
    service = TestBed.inject(ProfileAbstract);
    formsFacade = TestBed.inject(FormsFacade);
    profileFacade = TestBed.inject(ProfileFacade);
  });

  describe('editProfile$', () => {
    it('should dispatch a EditProfileSuccess action when service call succeeds', () => {
      const profile = {
        id: '1',
        username: 'Jan Kowalski',
        bio: 'this is my bio',
        image: 'https://myimage.com',
        following: false,
        joinedAt: '2021-04-10T17:46:58.853Z',
      };

      const editProfileAction = ProfileActions.editProfile();
      const editProfileSuccessAction = ProfileActions.editProfileSuccess({
        profile,
      });

      actions$ = hot('-a---', { a: editProfileAction });
      const response = cold('-a|', {
        a: { profile },
      });
      const expected = cold('--b', { b: editProfileSuccessAction });

      service.updateProfile = jest.fn(() => response);

      expect(effects.editProfile$).toBeObservable(expected);
    });

    it('should dispatch a EditProfileFail when service call fails', () => {
      const result = {
        code: 500,
        message: 'An error has occurred while loading profile.',
      };

      const editProfileAction = ProfileActions.editProfile();
      const editProfileFailAction = ProfileActions.editProfileFail({
        error: result,
      });

      actions$ = hot('-a---', { a: editProfileAction });
      const response = cold('-#', null, result);
      const expected = cold('--b', { b: editProfileFailAction });

      service.updateProfile = jest.fn(() => response);

      expect(effects.editProfile$).toBeObservable(expected);
    });
  });
});
