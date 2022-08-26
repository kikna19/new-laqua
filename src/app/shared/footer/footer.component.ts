import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, RendererFactory2, ViewEncapsulation, Inject, } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {

  paragraphEl = document.getElementsByClassName('more') as HTMLCollection;


  constructor(
    private renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
    const paragraphEl = Object.values(this.paragraphEl);
    paragraphEl.forEach(el => {
      const line = this.renderer.createElement('span');
      this.renderer.setStyle(line, 'display', 'block');
      this.renderer.setStyle(line, 'width', 'auto');
      this.renderer.setStyle(line, 'height', '.01rem');
      this.renderer.setStyle(line, 'background-color', '#b964f3');
      this.renderer.setStyle(line, 'margin-top', '.5rem');
      el.appendChild(line)
    });
  }

}
