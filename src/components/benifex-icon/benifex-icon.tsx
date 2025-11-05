import {
  Component,
  Prop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  h,
  Host,
  Element,
} from '@stencil/core';
import { icons } from '../benifex-icon-sprite/icons';

/**
 * NOTE: Render <benifex-icon-sprite /> before using this component. It is the sprite that this component depends on.
 * One needs to add this to shadowDOM for it to take affect.
 * Have the <icon>-fill version of the icon as well, when adding a new icon
 */
@Component({
  tag: 'benifex-icon',
  shadow: false,
  styleUrl: 'benifex-icon.scss',
})
export class BenifexIcon {
  @Prop() name: string;
  @Prop() variant: 'outline' | 'fill';
  @Element() el!: HTMLElement;

  render() {
    const hostClasses = this.el.className;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hostStyles: any = this.el.getAttribute('style');

    if (!icons.includes(this.name)) {
      return null;
    }
    if (this.variant) {
      return (
        <svg class={`benifex-icon ${hostClasses}`} style={hostStyles}>
          <use
            href={`#${this.name}${this.variant === 'fill' ? '-fill' : ''}`}
          />
        </svg>
      );
    }

    return (
      <Host>
        <svg class={`benifex-icon outline ${hostClasses}`} style={hostStyles}>
          <use href={`#${this.name}`} />
        </svg>
        <svg class={`benifex-icon fill ${hostClasses}`} style={hostStyles}>
          <use href={`#${this.name}-fill`} />
        </svg>
      </Host>
    );
  }
}
