import {Directive, ElementRef, Input} from '@angular/core';
const md5 = require('md5');

@Directive({
  selector: '[gravatar]'
})
export class GravatarDirective {
  @Input('email') email: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.elementRef.nativeElement.src = `//www.gravatar.com/avatar/${md5(this.email)}`;
  }
}