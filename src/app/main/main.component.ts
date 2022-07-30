import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import gsap from "gsap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent {
  btnTl = gsap.timeline();
  @ViewChild('btn', {static: true}) btn!: ElementRef

  btnAnimationIn(): void {
    if (!this.btnTl.isActive())
      this.btnTl.fromTo(this.btn.nativeElement, {
        left: '0%'
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
      ease: 'ease'
    })
  }

}
