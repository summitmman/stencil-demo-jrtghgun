import { Component, h, Fragment, Prop } from '@stencil/core';

@Component({
  tag: 'poc-nav-menu-item',
  shadow: false,
})
export class POCNavMenuItem {
  @Prop() icon!: string;

  private hideTimeout!: number;
  private showTimeout!: number;
  private hoverElement: HTMLElement | null = null;

  private handleMouseEnter = (e: MouseEvent) => {
    clearTimeout(this.hideTimeout);
    this.hoverElement = (e.target as HTMLElement) ?? null;
    this.showTimeout = setTimeout(() => {
      this.hoverElement && this.hoverElement.classList.add('hover');
    }, 150) as unknown as number;
  };

  private handleMouseLeave = (e: MouseEvent) => {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hoverElement && this.hoverElement.classList.remove('hover');
    }, 150) as unknown as number;
  };

  private handleMouseContentEnter = (e: MouseEvent) => {
    clearTimeout(this.hideTimeout);
    if ((e.target as HTMLElement)?.parentElement?.children[0]) {
      this.hoverElement = (e.target as HTMLElement).parentElement!
        .children[0] as HTMLElement;
    } else {
      this.hoverElement = null;
    }
    this.showTimeout = setTimeout(() => {
      this.hoverElement && this.hoverElement.classList.add('hover');
    }, 150) as unknown as number;
  };

  private handleMouseContentLeave = (e: MouseEvent) => {
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hoverElement && this.hoverElement.classList.remove('hover');
    }, 150) as unknown as number;
  };

  render() {
    return (
      <Fragment>
        <button
          class="item"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <benifex-icon class="icon" name={this.icon}></benifex-icon>
        </button>
        <div
          class="menu-content"
          onMouseEnter={this.handleMouseContentEnter}
          onMouseLeave={this.handleMouseContentLeave}
        >
          <slot></slot>
        </div>
      </Fragment>
    );
  }
}
