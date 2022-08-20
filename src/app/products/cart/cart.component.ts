import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildrenDecorator,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {ProductService} from "../services/product.service";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  fromEvent,
  map,
  Observable,
  pluck,
  Subscription,
  switchMap,
  take,
  tap,
} from "rxjs";
import {Product} from "../product";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CartAlertComponent} from "../../shared/cart-alert/cart-alert.component";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {of} from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('main', {read: ElementRef, static: false}) main!: ElementRef<any>;
  @ViewChild('search', {static: true}) input!: ElementRef<HTMLInputElement>;
  inputValue: string = '';
  products: Product[] = [];
  sub$!: Subscription;
  products$!: Observable<Product[]>;
  priceVal: number = 0;
  view = faEye;
  itemNums: number = 6;
  showItemNums!: number;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.products$ = <Observable<Product[]>>this.productService.getProduct().pipe(
      map((arr: Product[]): Product[] => {
        this.showItemNums = arr.length;
        return arr.slice(0, this.itemNums);
      })
    );
    this.sub$ = this.products$.subscribe(
      res => {
        this.products = res;
      }
    )
  }

  showMoreItems(): void {
    this.itemNums += 2;
    this.products$.pipe(
      map((i: Product[]) => i.slice(0, this.itemNums))
    ).subscribe(
      res => this.products = res
    );


  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      pluck('target', 'value'),
      filter((val: any) => val.trim().length !== 0),
      filter((val: any) => val.length >= 0),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(_ => this.products$.pipe(
        map((arr: Product[]) => arr.filter((i: Product) => i.name.includes(this.inputValue.trim())))
      ))
    ).subscribe(
      res => this.products = res
    );
  }

  filterValue(val: number): string | number {
    if (val <= 500) {
      return val + '₾'
    }
    return val;
  }

  priceFilter(price: number): void {
    this.products$.pipe(
      filter(_ => price > 0),
      map((i: Product[]) => i.filter((i: Product) => i.price <= price)),
    ).subscribe(
      res => this.products = res
    )
  }

  speciesFilter(specie: string): void {
    this.products$.pipe(
      map((i: Product[]) => i.filter((i: Product) => i.species === specie)),
    ).subscribe(
      res => this.products = res
    )
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe()
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
