import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { UiComponentsModule } from '@dev-together/ui-components';
import { BlogModule } from '@dev-together/blog';
import { HomeResolver } from './home.resolver';

@NgModule({
  imports: [
    CommonModule,
    BlogModule,
    UiComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
        resolve: { HomeResolver },
      }
    ])
  ],
  declarations: [
    HomeComponent
  ],
  providers: [HomeResolver],
  exports: [
    HomeComponent
  ],
})
export class HomeModule {}
