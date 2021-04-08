import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from '@dev-together/auth';
import { RouterModule } from '@dev-together/router';
import { UiLayoutModule } from '@dev-together/ui-layout';
import { UiElementsModule } from '@dev-together/ui-elements';
import { AppRoutingModule } from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    UiLayoutModule,
    UiElementsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    RouterModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
