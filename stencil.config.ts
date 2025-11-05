import { Config } from '@stencil/core';
import { inlineSvg } from 'stencil-inline-svg';

export const config: Config = {
    namespace: 'demo',
    hashFileNames: false,
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [inlineSvg()],
    devServer: {
      openBrowser: false,
    }
};
