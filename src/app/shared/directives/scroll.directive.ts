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

    if (target == 100)
      this.scrollHeight.emit(true);
  }

}
