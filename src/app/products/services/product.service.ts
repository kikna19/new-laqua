import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../product";
import {BehaviorSubject, map, Observable, pluck} from "rxjs";

@Injectable()
export class ProductService {
  products$: Observable<Product[]> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient
  ) {
  }

  getProduct() {
    return this.http.get<Product[]>('/assets/product.json').pipe(
      pluck('products')
    )
  }
}
