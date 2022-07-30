import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ProductService} from "./services/product.service";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatRippleModule} from "@angular/material/core";

const routes: Routes = [
  {path: '', component: CartComponent}
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    FormsModule,
    MatSelectModule,
    MatRippleModule
  ],
  providers:[
    {provide: ProductService, useClass: ProductService}
  ]
})
export class ProductsModule { }
