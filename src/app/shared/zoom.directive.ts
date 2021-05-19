import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {
  @HostBinding('class.small') isZoomed!: boolean;

  @HostListener('mouseenter') onMouseEnter(): void {
    this.isZoomed = true;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.isZoomed = false;
  }
}
