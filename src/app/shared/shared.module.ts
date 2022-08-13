import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterModule} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {CartAlertComponent} from './cart-alert/cart-alert.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartAlertComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatBadgeModule,
    RouterModule,
    MatIconModule,
  ],

})
export class SharedModule {
}
