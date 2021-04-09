import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@dev-together/forms';
import { UiElementsModule } from '@dev-together/ui-elements';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LocalStorageService,
  SessionStorageService,
  StorageService,
} from './shared/storage.service';
import {
  authFeatureKey,
  authInitialState,
  authReducer,
} from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthGuardService } from './shared/auth.guard';
import { AuthService } from './shared/auth.service';
import { AuthFacade } from './+state/auth.facade';
import { TokenInterceptorService } from './token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule } from '@dev-together/api';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      key: 'login',
    },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      key: 'register',
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ApiModule,
    UiElementsModule,
    StoreModule.forFeature(authFeatureKey, authReducer, {
      initialState: authInitialState,
    }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [LoginComponent, RegisterComponent, AuthWrapperComponent],
})
export class AuthModule {
  static withConfig({
    type,
  }: {
    type: 'local' | 'session';
  }): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        AuthEffects,
        AuthGuardService,
        AuthService,
        AuthFacade,
        TokenInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        },
        {
          provide: StorageService,
          useFactory: () => {
            if (type === 'session') {
              return new SessionStorageService();
            }

            return new LocalStorageService();
          },
        },
      ],
    };
  }
}
