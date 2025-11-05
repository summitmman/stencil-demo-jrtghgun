import {
    Component, h, JSX, Host, Prop, ComponentInterface, Watch, Element, EventEmitter, Event
} from '@stencil/core';
import SwiperCore, { Pagination } from 'swiper/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { getMutationObserver } from './getMutationObserver';
import { requestAnimationFrame } from './requestAnimationFrame';
import { parseProp } from './parseProp';
import { isRecord } from './isRecord';


SwiperCore.use([Pagination]);

const paginationDefaultSettings = {
    clickableClass: 'swiper-pagination-clickable',
    bulletClass: 'swiper-pagination-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active',
    lockClass: 'swiper-pagination-lock',
    bulletElement: 'span',
    currentClass: 'swiper-pagination-current',
    hiddenClass: 'swiper-pagination-hidden',
    modifierClass: 'swiper-pagination-',
};

@Component({
    tag: 'content-slider',
    shadow: false,
})
export class ContentSliderProvider implements ComponentInterface {
    @Prop() public target = '.swiper-container';

    @Prop() public options: SwiperOptions | string = {};

    @Prop() public paginationOptions: PaginationOptions | string = {};

    @Event() private sliderInit!: EventEmitter<SwiperCore>;

    @Element() public el!: HTMLElement;

    private slider?: SwiperCore;

    private optionsParsed: SwiperOptions = {};

    private paginationOptionsParsed: PaginationOptions = {};

    private mutationObserver?: MutationObserver;

    private sliderReady = false;

    public async componentWillLoad(): Promise<void> {
        this.readPaginationOptions(this.paginationOptions);
        this.readOptions(this.options);
        this.mutationObserver = getMutationObserver(() => {
            if (this.sliderReady) {
                this.slider?.update();
            }
        });
    }

    public render(): JSX.Element {
        return (<Host><slot/></Host>);
    }

    @Watch('options')
    public readOptions(newValue: string | SwiperOptions) {
        this.optionsParsed = parseProp(newValue, isRecord, {});
    }

    @Watch('paginationOptions')
    public readPaginationOptions(newValue: string | PaginationOptions) {
        this.paginationOptionsParsed = parseProp(newValue, isRecord, {});
    }

    public async componentDidUpdate(): Promise<void> {
        if (!this.slider) {
            return;
        }
        this.slider.params = { ...this.slider.params, ...this.getOptions() };
        requestAnimationFrame(() => this.slider?.update());
    }

    public async componentDidLoad(): Promise<void> {
        this.mutationObserver?.observe(this.el, {
            subtree: true,
            childList: true,
        });
        requestAnimationFrame(() => this.init());
    }

    private init() {
        const options = this.getOptions();
        this.slider = new SwiperCore(this.target, {
            ...options,
            on: {
                afterInit: (instance) => {
                    this.sliderReady = true;
                    this.sliderInit.emit(instance);
                },
            },
        });
    }

    private getOptions(): SwiperOptions {
        return {
            ...this.optionsParsed,
            pagination: {
                clickable: true,
                type: 'bullets',
                el: '.swiper-pagination',
                // @TODO it is workaround - investigated how get rid of this
                ...paginationDefaultSettings,
                ...this.paginationOptionsParsed,
            },
        };
    }

    public disconnectedCallback(): void {
        this.mutationObserver?.disconnect();
        this.mutationObserver = undefined;
        this.slider?.destroy();
        this.slider = undefined;
    }
}
