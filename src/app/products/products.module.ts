import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatRippleModule} from "@angular/material/core";
import { PurchaseComponent } from './purchase/purchase.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDividerModule} from "@angular/material/divider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '', component: CartComponent,
    title: 'Products'
  },
  {
    path: 'cart', component: PurchaseComponent,
    title: 'Cart'
  }
]

@NgModule({
  declarations: [
    CartComponent,
    PurchaseComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatSliderModule,
        FormsModule,
        MatSelectModule,
        MatRippleModule,
        MatSnackBarModule,
        MatDividerModule,
        FontAwesomeModule,
        MatIconModule,
    ],
})
export class ProductsModule { }
