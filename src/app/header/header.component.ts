import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


import {faShoppingCart} from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import {animate, state, style, transition, trigger} from "@angular/animations";
import gsap from "gsap";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('hambOne', [
      state('hambOne2', style({})),
      state('hambOne3', style({
        transform: 'translateY(.75rem) rotate(45deg)',
        backgroundColor: 'white',
      })),
      transition('*<=>*', animate('.5s ease-in-out')),
    ]),
    trigger('hambSec', [
      state('hambSec2', style({})),
      state('hambSec3', style({
        opacity: 0
      })),
      transition('*<=>*', animate('.5s ease-in-out')),
    ]),
    trigger('hambThi', [
      state('hambThi2', style({})),
      state('hambThi3', style({
        transform: 'translateY(-.75rem) rotate(-45deg)',
        backgroundColor: 'white',
      })),
      transition('*<=>*', animate('.5s ease-in-out')),
    ]),
    trigger('drop', [
      state('drop2', style({
        opacity: 0,
      })),
      state('drop3', style({
        opacity: 1,
        zIndex: 100000
      })),
      transition('drop2 => drop3', animate('1s ease-in-out')),
      transition('drop3 => drop2', animate('1s ease-in-out')),
    ]),
    trigger('header', [
      state('header2', style({
        backgroundColor: 'transparent',
      })),
      state('header3', style({
        backgroundColor: '#071c26',
        color: 'white',
      })),
      transition('* <=> *', animate('1s ease-in-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  cart = faShoppingCart;
  hambOne1 = 'hambOne2';
  hambSec1 = 'hambSec2';
  hambThi1 = 'hambThi2';
  header1 = 'header2';
  drop1 = 'drop2';
  @ViewChild('marineF', {static: true}) marineF!: ElementRef
  @ViewChild('fresh', {static: true}) fresh!: ElementRef
  @ViewChild('acce', {static: true}) acce!: ElementRef
  @ViewChild('spec', {static: true}) spec!: ElementRef
  @ViewChild('aboutF', {static: true}) aboutF!: ElementRef
  @ViewChild('cont', {static: true}) cont!: ElementRef
  @ViewChild('btn', {static: true}) btn!: ElementRef
  tl = gsap.timeline({reversed: true});
  btnTl = gsap.timeline();


  constructor(
    private renderer: Renderer2,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {

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
      stagger: {
        amount: .8,
      },
    })
  }


  hambRotate(): void {
    this.hambOne1 = this.hambOne1 === 'hambOne2' ? 'hambOne3' : 'hambOne2';
    this.hambSec1 = this.hambSec1 === 'hambSec2' ? 'hambSec3' : 'hambSec2';
    this.hambThi1 = this.hambThi1 === 'hambThi2' ? 'hambThi3' : 'hambThi2';
    this.header1 = this.header1 === 'header2' ? 'header3' : 'header2';
    this.drop1 = this.drop1 === 'drop2' ? 'drop3' : 'drop2';
    this.tl.reversed() ? this.tl.play() : this.tl.reverse();
    this.disableScroll();

  }

  disableScroll(): void {
    if (this.drop1 === 'drop3')
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden')
    else this.renderer.removeStyle(this.document.body, 'overflow')
  }

  btnAnimationIn(): void {
    if (!this.btnTl.isActive())
      this.btnTl.fromTo(this.btn.nativeElement, {
        left: '0%'
      }, {
        duration: .5,
        width: '100%',
        ease: 'ease'
      })
  }

  btnAnimationOut(): void {
    this.btnTl.to(this.btn.nativeElement, {
      duration: .5,
      width: '0%',
      left: '100%',
      ease: 'ease'
    })
  }

}
