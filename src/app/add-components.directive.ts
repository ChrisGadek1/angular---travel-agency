import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[placeToAddCountryList]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
