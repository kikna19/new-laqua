import { Component, OnInit } from '@angular/core';
import {OrderService} from "../services/order.service";
import {Purchase} from "../../shared/types/purchase.interface";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  payment!: Purchase;

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.payment = this.orderService.purchaseInfo.value;
  }
}
