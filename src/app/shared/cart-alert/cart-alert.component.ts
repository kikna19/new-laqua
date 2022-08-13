import {ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cart-alert',
  templateUrl: './cart-alert.component.html',
  styleUrls: ['./cart-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartAlertComponent implements OnInit {


  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string[]
  ) { }

  ngOnInit(): void { }
}
