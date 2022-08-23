import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { ProductService } from "../services/product.service";
import {
  map,
  Observable,
  Subscription,
} from "rxjs";
import { Product } from "../product";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CartAlertComponent } from "../../shared/cart-alert/cart-alert.component";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { filterArr } from 'src/app/shared/types/filter';
import { CardComponent } from 'src/app/shared/card/card.component';
import { tl } from 'src/app/shared/gsap/gsap.animation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChildren('comp', { read: ViewContainerRef }) comp!: QueryList<ViewContainerRef>;
  products: Product[] = [];
  sub$!: Subscription;
  products$!: Observable<Product[]>;
  priceVal: number = 0;
  view = faEye;
  itemNums!: number;
  showItemNums!: number;
  loader: boolean = false;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.products$ = <Observable<Product[]>>this.productService.getProduct();
    this.sub$ = this.products$
    .subscribe({
      next: (res) => {
        this.products = res;
        this.itemNums = this.products.length =  this.showItemNums 
      }
    })
  }

  g(): void {
    this.comp.map((vcr: ViewContainerRef) => {
      vcr.clear();
      const f = vcr.createComponent(CardComponent);
      f.instance.data = this.products;
      this.cdr.detectChanges();
    })
  }

  ngAfterViewChecked(): void {
    this.g();
  }


  filterValue(val: number): string | number {
    if (val <= 500) {
      return val + '₾'
    }
    return val;
  }

  priceFilter(price: number): void {
    filterArr(this.products$, price).pipe(
      this.loaderService.loading
    ).subscribe({
      next: (res) => {
        this.products = res;
        this.itemNums = this.products.length;
      }
    })
  }

  speciesFilter(specie: string): void {
    filterArr(this.products$, specie).pipe(
      this.loaderService.loading
    ).subscribe({
      next: (res) => {
        this.products = res;
        this.itemNums = this.products.length;
      }
    })
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    tl.clear();
  }


  addToCart(prod: Product): void {
    this.productService.addToCart(prod);
    let msg: string;
    let msgClass: string;
    if (!this.productService.exist) {
      msg = 'Product added !';
      msgClass = 'success';
    } else {
      msg = 'Product is also added !';
      msgClass = 'error';
    }
    this.snackBar.openFromComponent(CartAlertComponent, {
      data: [msg, msgClass],
      duration: 2000,
      horizontalPosition: 'start',
    });
  }
}
