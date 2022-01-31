import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appParamExpansion]',
})
export class ParamExpansionDirective {
  constructor(private elRef: ElementRef) {}

  @HostListener('document: click', ['$event']) clickOut(event: any) {
    if (
      !this.elRef.nativeElement.contains(event.target) &&
      this.elRef.nativeElement.classList.contains('active')
    ) {
      this.elRef.nativeElement.classList.remove('active');
    }
  }
}
