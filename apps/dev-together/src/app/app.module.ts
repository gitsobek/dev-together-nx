import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from '@dev-together/auth';
import { NgrxRouterModule } from '@dev-together/router';
import { UiLayoutModule } from '@dev-together/ui-layout';
import { UiElementsModule } from '@dev-together/ui-elements';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { UiComponentsModule } from '@dev-together/ui-components';
import { MatchMediaService } from '@dev-together/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule.withConfig({ type: 'local' }),
    AppRoutingModule,
    UiLayoutModule,
    UiElementsModule,
    UiComponentsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgrxRouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [MatchMediaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
