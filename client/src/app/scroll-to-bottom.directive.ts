import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollToBottom]'
})
export class ScrollToBottomDirective {

  // tslint:disable-next-line: variable-name
  constructor(private _el: ElementRef) { }

  public scrollToBottom() {
    const el: HTMLDivElement = this._el.nativeElement;
    el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
  }
}
