import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'demo',
    hashFileNames: false,
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    devServer: {
      openBrowser: false,
    }
};
