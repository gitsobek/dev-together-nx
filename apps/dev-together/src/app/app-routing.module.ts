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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
