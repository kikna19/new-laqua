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
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDividerModule} from "@angular/material/divider";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  {path: '', component: CartComponent},
  {path: 'p', component: PurchaseComponent}
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
        FontAwesomeModule,
        MatDividerModule,
        MatSnackBarModule,
        SharedModule
    ],
})
export class ProductsModule { }
