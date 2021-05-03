import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@dev-together/home').then((m) => m.HomeModule),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('@dev-together/article').then((m) => m.ArticleModule),
  },
  {
    path: 'profile/:username',
    loadChildren: () =>
      import('@dev-together/profile').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
