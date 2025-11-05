import { h, Component } from '@stencil/core';

@Component({
  tag: 'poc-nav-drawer',
  styleUrl: 'poc-nav-drawer.css',
  shadow: true,
})
export class POCNavDrawer {
  render() {
    return (
      <div class="poc-nav-drawer container">
        <benifex-icon-sprite></benifex-icon-sprite>
        <div class="drawer">
          <div class="brand"></div>
          <div class="content">
            <ul class="primary">
              <li>
                <poc-nav-menu-item icon="home">
                  <div class="tooltip">Home</div>
                  <ul class="secondary">
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                  </ul>
                </poc-nav-menu-item>
              </li>
              <li>
                <poc-nav-menu-item icon="benefits">
                  <div class="tooltip">Benefits</div>
                  <ul class="secondary">
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                  </ul>
                </poc-nav-menu-item>
              </li>
              <li>
                <poc-nav-menu-item icon="recognition">
                  <div class="tooltip">Recognition</div>
                </poc-nav-menu-item>
              </li>
              <li>
                <poc-nav-menu-item icon="reward">
                  <div class="tooltip">Reward</div>
                </poc-nav-menu-item>
              </li>
              <li>
                <poc-nav-menu-item icon="trs">
                  <div class="tooltip">TRS</div>
                </poc-nav-menu-item>
              </li>
              <li>
                <poc-nav-menu-item icon="discounts">
                  <div class="tooltip">Discounts</div>
                  <ul class="secondary">
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                    <li>My Benefits</li>
                    <li>Add benefits</li>
                    <li>Salary & funding</li>
                  </ul>
                </poc-nav-menu-item>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
