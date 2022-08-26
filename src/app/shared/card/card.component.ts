import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Product } from 'src/app/products/product';
import { ProductService } from 'src/app/products/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartAlertComponent } from '../cart-alert/cart-alert.component';
import { toArray } from 'rxjs';
import { textAnimate } from '../gsap/gsap.animation';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() item!: Product;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void { }


  addToCart(prod: Product): void{
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
    })

   
  }

}
