import { newSpecPage } from '@stencil/core/testing';
import { ContentSliderProvider } from './content-slider-provider';

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';
describe('content-slider-provider', () => {
    test('test', async () => {
        const page = await newSpecPage({
            html: '',
            components: [ContentSliderProvider],
        });
        page.setContent(`
<content-slider options='${JSON.stringify({ width: '200' })}'>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="levo-content-slider__slide swiper-slide number-slide1">1</div>
            <div class="levo-content-slider__slide swiper-slide number-slide2">2</div>
            <div class="levo-content-slider__slide swiper-slide number-slide3">3</div>
            <div class="levo-content-slider__slide swiper-slide number-slide4">4</div>
            <div class="levo-content-slider__slide swiper-slide number-slide5">5</div>
            <div class="levo-content-slider__slide swiper-slide number-slide6">6</div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</content-slider>
            `);
        await page.waitForChanges();
        const wait = new Promise((resolve) => {
            page.doc.addEventListener('sliderInit', (e: CustomEvent) => resolve(e.detail));
        });
        await expect(wait).resolves.toBeTruthy();
        expect(page.root).toEqualHtml(`
<content-slider options="{&quot;width&quot;:&quot;200&quot;}">
  <div class="swiper-container swiper-container-horizontal swiper-container-initialized">
    <div class="swiper-wrapper">
      <div class="levo-content-slider__slide number-slide1 swiper-slide swiper-slide-active" style="width: 200px;">
        1
      </div>
      <div class="levo-content-slider__slide number-slide2 swiper-slide swiper-slide-next" style="width: 200px;">
        2
      </div>
      <div class="levo-content-slider__slide number-slide3 swiper-slide" style="width: 200px;">
        3
      </div>
      <div class="levo-content-slider__slide number-slide4 swiper-slide" style="width: 200px;">
        4
      </div>
      <div class="levo-content-slider__slide number-slide5 swiper-slide" style="width: 200px;">
        5
      </div>
      <div class="levo-content-slider__slide number-slide6 swiper-slide" style="width: 200px;">
        6
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-clickable">
          <span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
          <span class="swiper-pagination-bullet"></span>
          <span class="swiper-pagination-bullet"></span>
          <span class="swiper-pagination-bullet"></span>
          <span class="swiper-pagination-bullet"></span>
          <span class="swiper-pagination-bullet"></span>
    </div>
  </div>
</content-slider>
        `);
    });
});
