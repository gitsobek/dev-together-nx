import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { CustomSerializer } from './+state/custom-serializer';
import { RouterEffects } from './+state/router.effects';
import { routerFeatureKey } from './+state/router.models';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(routerFeatureKey, routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: routerFeatureKey }),
  ],
  providers: [
    RouterEffects,
    [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  ],
})
export class NgrxRouterModule {}
