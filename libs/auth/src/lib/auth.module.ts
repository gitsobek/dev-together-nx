import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@dev-together/forms';
import { UiElementsModule } from '@dev-together/ui-elements';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      key: 'login'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      key: 'register'
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    UiElementsModule,
  ],
  declarations: [LoginComponent, RegisterComponent, AuthWrapperComponent],
})
export class AuthModule {}
