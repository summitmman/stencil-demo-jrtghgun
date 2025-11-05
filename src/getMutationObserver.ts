import { getWindow } from './getWindow';

export function getMutationObserver(
    callback: MutationCallback,
): MutationObserver | undefined {
  const w: Window = getWindow();
    return 'MutationObserver' in w
        ? (w as any).MutationObserver(callback) : undefined;
}