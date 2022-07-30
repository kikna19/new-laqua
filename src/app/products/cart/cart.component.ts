import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProductService} from "../services/product.service";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Observable,
  pluck,
  Subscription,
  switchMap,
} from "rxjs";
import {Product} from "../product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search', {static: true}) input!: ElementRef<HTMLInputElement>;
  inputValue: string = '';
  products: Product[] = [];
  sub$!: Subscription;
  products$!: Observable<Product[]>;
  priceVal: number = 0;


  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products$ = <Observable<Product[]>>this.productService.getProduct();
    this.sub$ = this.products$.subscribe(
      res => this.products = res
    )
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup').pipe(
      pluck('target', 'value'),
      filter((val: any) => val.trim().length !== 0),
      filter((val: any) => val.length >= 0),
      distinctUntilChanged(),
      debounceTime(1000),
      switchMap(_=> this.products$.pipe(
        map((arr: Product[]) => arr.filter((i: Product) => i.name.includes(this.inputValue)))
      ))
    ).subscribe(
      res => this.products = res
    )
  }

  filterValue(val: number): any {
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
      switchMap((i: Product[]) => i.filter((i: Product) => i.species === specie)),
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
