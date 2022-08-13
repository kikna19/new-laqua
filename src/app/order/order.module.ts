import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {OrderComponent} from "./order-component/order.component";
import {OrderService} from "./services/order.service";
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
    title: 'Order'
  },
  {
    path: 'payment',
    component: PaymentComponent,
    title: 'Payment'
  }
]

@NgModule({
  declarations: [
    OrderComponent,
    PaymentComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
  providers: [
    OrderService
  ]
})
export class OrderModule { }
