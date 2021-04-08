import { Params, NavigationExtras } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export const routerFeatureKey = 'router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface RouterState {
  readonly [routerFeatureKey]: fromRouter.RouterReducerState<RouterStateUrl>;
}

export interface Route {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}
