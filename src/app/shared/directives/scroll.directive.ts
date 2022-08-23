import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  @Output() scrollHeight = new EventEmitter<boolean>();

  @HostListener('scroll', ['$event']) onScroll(e: any) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = e.target;
    let target = scrollTop / (scrollHeight - clientHeight) * 100;

    console.log(target);

    if (target.toFixed(0) >= '99')
      this.scrollHeight.emit(true);
  }

}
