import {
  AfterViewInit,
  Component,
  ElementRef, OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import gsap from "gsap";
import { faFish } from "@fortawesome/free-solid-svg-icons/faFish";
import {
  concatMap,
  filter, finalize,
  fromEvent,
  interval,
  map,
  Observable,
  switchMap,
  take,
} from "rxjs";
import { scrollAnimate, textAnimate, textSplitAnimate } from '../shared/gsap/gsap.animation';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, AfterViewInit {
  btnTl = gsap.timeline();
  @ViewChild('btn', { static: true }) btn!: ElementRef;
  @ViewChild('parrots', { static: true }) parrots!: ElementRef;
  @ViewChild('fishes', { static: true }) fishes!: ElementRef;
  @ViewChild('pets', { static: true }) pets!: ElementRef;
  @ViewChild('c', { static: true }) c!: ElementRef;
  @ViewChild('friend', { static: true }) friend!: ElementRef;
  @ViewChild('btnText', { static: true }) btnText!: ElementRef;
  @ViewChild('offerHeader', { static: true }) offerHeader!: ElementRef;
  @ViewChild('offer', { static: true, read: ElementRef }) offer!: ElementRef;
  @ViewChild('stepperHeader', { static: true }) stepperHeader!: ElementRef;
  @ViewChild('productsHeader', { static: true }) productsHeader!: ElementRef;
  @ViewChild('stepperItem', { static: true }) stepperItem!: ElementRef
  numText = <HTMLCollection>document.getElementsByClassName('num-text');
  fish = faFish;



  ngOnInit(): void {
    textSplitAnimate([this.friend.nativeElement], 0, 1.1, .1);
    textAnimate([this.btnText.nativeElement, this.offerHeader.nativeElement]);
  }

  ngAfterViewInit(): void {
    fromEvent(document, 'scroll').pipe(
      map((e: any) => this.getScroll(e.target.scrollingElement)),
      filter(value => value >= 80),
      take(1),
      concatMap(_ => this.numsShow()),
    ).subscribe();

    scrollAnimate([
      this.offer.nativeElement,
      this.stepperHeader.nativeElement,
      this.stepperItem.nativeElement,
      this.productsHeader.nativeElement
    ]);
  }

  getScroll(e: any): number {
    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = e;
    return scrollTop / (scrollHeight - clientHeight) * 100;
  }

  numsShow(): Observable<any> {
    return interval(50).pipe(
      take(100),
      switchMap(val => [
        this.parrots.nativeElement.innerHTML = (val / 2).toFixed(0),
        this.fishes.nativeElement.innerHTML = val + 1,
        this.pets.nativeElement.innerHTML = (val / 3).toFixed(0),
      ]),
      finalize(() => this.numTextShow()),
    )
  }

  numTextShow(): void {
    for (let i = 0; i <= this.numText.length; i++) {
      const el = this.numText[i] as HTMLElement;
      el.style.opacity = '1';
    }
  }

  btnAnimationIn(): void {
    if (!this.btnTl.isActive())
      this.btnTl.fromTo(this.btn.nativeElement, {
        left: '0%',
      }, {
        duration: .5,
        width: '101%',
        ease: 'ease'
      })
  }

  btnAnimationOut(): void {
    this.btnTl.to(this.btn.nativeElement, {
      duration: .5,
      width: '0%',
      left: '100%',
      ease: 'ease',
    })
  }
}
