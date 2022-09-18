import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import divSrcSDK from '@divsrc/divsrc-sdk-lite';
import ReactRenderer from '@divsrc/divsrc-sdk-lite/lib/ReactRenderer';
import { Login } from '@supersonic-studios/ui-components';
const pkg = require('../package.json')
const artifactName = pkg.name.replace('/', '-')
declare global {
  interface Window {
    react: any;
    System: any;
    platforms: {
      apiHost?: string;
      apiVersion?: string;
      platform?: string;
    };
    navigate: any;
  }
}

(async function () {
  window.platforms = { apiHost: 'http://localhost:8081', apiVersion: 'v1', platform: 'admin' };
  (window as any).ldClient = {
    variation: (key: string, defaultValue: boolean = false) => {
      return true
    },
    waitUntilReady: () => {
      return true
    }
  }
    await divSrcSDK.init({
      installationMapUrl: 'https://ui-assets.supersonic.com/mfe/staging/map.json',
      emulators: [
        {
          url: 'http://localhost:5570',
          components: ['@supersonic-good-morning-mfe'],
        },
      ],
    });
  const reactRenderer: any = new ReactRenderer(divSrcSDK);
  const CmpMFE = reactRenderer.import('@supersonic-good-morning-mfe');

  const App = () => {
    return <CmpMFE baseRoute={'/'} gap={'223px'} />;
  };

  ReactDOM.render(<App />, document.querySelector('#root'));
})();
