import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../product";
import {map, Observable, of, pluck, subscribeOn, Subscription} from "rxjs";
import {faCircleCheck, faRemove, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faBan} from "@fortawesome/free-solid-svg-icons/faBan";
import {Router} from "@angular/router";


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {
  products!: Product[];
  remove = faRemove;
  trash = faTrash;
  buy = faCircleCheck;
  empty = faBan;
  unsub$!: Subscription;

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.unsub$ = this.productService.getProducts().subscribe(
      res => this.products = res
    );
  }

  removeItem(index: number): void {
    this.productService.getProducts().pipe(
      map(arr => arr.splice(index, 1))
    ).subscribe();
  }

  ngOnDestroy(): void {

    this.unsub$?.unsubscribe();
  }

  total(): number {
    return this.products.map(i => i.price).reduce((acc, curr) => acc + curr);
  }

  clearCart(): void {
    this.productService.getProducts().pipe(
      map(arr => arr.splice(0, arr.length))
    ).subscribe();
  }

  order(): void {
    this.router.navigate(['order'], {state: {amount: this.total()}})
  }

}
