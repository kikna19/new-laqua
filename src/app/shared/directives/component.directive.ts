import { ComponentFactoryResolver, Directive, ResolvedReflectiveFactory, ViewContainerRef } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Directive({
  selector: '[appComponent]'
})
export class ComponentDirective {

  constructor(
    public vcr: ViewContainerRef,
  ) {

  }

}
