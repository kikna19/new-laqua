import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewChild
} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {faBasketShopping} from "@fortawesome/free-solid-svg-icons/faBasketShopping";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import gsap from "gsap";
import {DOCUMENT} from "@angular/common";
import { ProductService } from 'src/app/products/services/product.service';
import { textAnimate } from '../gsap/gsap.animation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('drop', [
      state('drop2', style({
        opacity: 0,
      })),
      state('drop3', style({
        opacity: 1,
        zIndex: 100000,
      })),
      transition('drop2 => drop3', animate('1s ease-in-out')),
      transition('drop3 => drop2', animate('1s ease-in-out')),
    ]),

  ],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  cart = faBasketShopping;
  drop1 = 'drop2';
  dots = faCircleNotch;
  @ViewChild('marineF', {static: true}) marineF!: ElementRef
  @ViewChild('g', {static: true, read: ElementRef}) g!: ElementRef
  @ViewChild('fresh', {static: true}) fresh!: ElementRef
  @ViewChild('acce', {static: true}) acce!: ElementRef
  @ViewChild('spec', {static: true}) spec!: ElementRef
  @ViewChild('aboutF', {static: true}) aboutF!: ElementRef
  @ViewChild('cont', {static: true}) cont!: ElementRef;
  @ViewChild('aquarium', {static: true}) aqua!: ElementRef;
  @ViewChild('terrarium', {static: true}) terr!: ElementRef;
  @ViewChild('cage', {static: true}) cage!: ElementRef;
  tl = gsap.timeline({reversed: true});


  constructor(
    private renderer: Renderer2,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    public productService: ProductService,
    private router: Router
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    textAnimate([
      this.aqua.nativeElement,
      this.terr.nativeElement,
      this.cage.nativeElement,
    ])
  }

  goToCage(): void{
    this.router.navigate(['/products/p'])
  }


  ngAfterViewInit(): void {
    this.dropText();
  }




  dropText(): void {
    this.tl.fromTo([
      this.marineF.nativeElement,
      this.fresh.nativeElement,
      this.acce.nativeElement,
      this.spec.nativeElement,
      this.aboutF.nativeElement,
      this.cont.nativeElement
    ], {
      x: 50,
      opacity: 0,
    }, {
      delay: .5,
      opacity: 1,
      duration: 0.5,
      y: 10,
      autoAlpha: -3,
      ease: 'power2.easeOut',
      stagger: .2,
    })
  }


  hambRotate(): void {
    this.drop1 = this.drop1 === 'drop2' ? 'drop3' : 'drop2';
    this.tl.reversed() ? this.tl.play() : this.tl.reverse();
    this.disableScroll();

  }

  disableScroll(): void {
    if (this.drop1 === 'drop3')
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
    else this.renderer.removeStyle(this.document.body, 'overflow')
  }

}
