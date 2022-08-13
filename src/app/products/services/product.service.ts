import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../product";
import {BehaviorSubject, Observable, pluck} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  products$ = new BehaviorSubject<Product[]>([]);
  exist: boolean = false;

  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  getProduct(): any {
    return this.http.get<Product[]>('/assets/product.json').pipe(
      pluck('products')
    )
  }

  addToCart(prod: Product): void {
    const exist = this.products.find(i => i.id === prod.id);
    exist ? this.exist = true : (() => {
      this.products.push(prod);
      this.exist = false;
    })();
    this.products$.next(this.products);
  }

}
