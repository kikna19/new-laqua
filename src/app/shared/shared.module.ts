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
import { SpinnerComponent } from './loader/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ScrollDirective } from './directives/scroll.directive';
import { ComponentDirective } from './directives/component.directive';
import { CardComponent } from './card/card.component';
import { MatCardMdImage, MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartAlertComponent,
    SpinnerComponent,
    ScrollDirective,
    ComponentDirective,
    CardComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    ScrollDirective,
    ComponentDirective,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatBadgeModule,
    RouterModule,
    MatIconModule,
    NgxSpinnerModule,
    MatCardModule
  ],
})
export class SharedModule {
}
