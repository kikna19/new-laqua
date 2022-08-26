import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ProductService } from "../services/product.service";
import {
  Observable,
  Subscription,
} from "rxjs";
import { Product } from "../product";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { filterArr } from 'src/app/shared/types/filter';
import { textAnimate, tl } from 'src/app/shared/gsap/gsap.animation';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit, AfterViewInit,  OnDestroy {

  @ViewChildren('itemList', { read: ElementRef }) itemList!: QueryList<ElementRef>;
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
    public loaderService: LoaderService,
  ) {

  }

  ngOnInit(): void {
    this.products$ = <Observable<Product[]>>this.productService.getProduct();
    this.sub$ = this.products$
    .subscribe({
      next: (res) => {
        this.products = res;
        this.itemNums = this.products.length;
        this.showItemNums = this.products.length;
      }
    })
  }

  ngAfterViewInit(): void {
    this.itemList.changes.subscribe(res => {
      const items = res.toArray();
      items.forEach(( i:ElementRef ) => textAnimate(i.nativeElement))
    })
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
}
