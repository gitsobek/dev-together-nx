import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NotLoggedInDirective } from './navbar/not-logged-in.directive';
import { LoggedInDirective } from './navbar/logged-in.directive';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [NavbarComponent, LoggedInDirective, NotLoggedInDirective],
  exports: [NavbarComponent, LoggedInDirective, NotLoggedInDirective],
})
export class UiLayoutModule {}
