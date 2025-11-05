import {
  Component,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h,
  Prop,
  Host,
  Element,
  Watch
} from "@stencil/core";

@Component({
  tag: "inline-svg",
  shadow: false,
})
export class InlineSvg {
  @Element() el!: HTMLElement;

  @Prop() svg!: string;

  @Watch('svg')
  updateSvg() {
    this.applyHostAttributesToSvg();
  }

  componentDidLoad() {
    this.applyHostAttributesToSvg();
  }

  private applyHostAttributesToSvg() {
    const svg = this.el.querySelector('svg');
    if (svg) {
      svg.setAttribute('class', this.el.className || '');
      
      const hostStyle = this.el.getAttribute('style') || '';
      if (hostStyle) {
        svg.setAttribute('style', hostStyle);
      }
    }
  }

  render() {
    return <Host innerHTML={this.svg}></Host>;
  }
}
