import { getWindow } from './getWindow';

export const requestAnimationFrame = (h: any) => {
    const window = getWindow();
    if (typeof window.requestAnimationFrame === 'function') {
        return window.requestAnimationFrame(h);
    }
    return setTimeout(h);
};