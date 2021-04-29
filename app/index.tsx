import React from 'react'
import ReactDOM from 'react-dom'
import divSrcSDK from '@divsrc/divsrc-sdk';
import ReactRenderer from '@divsrc/divsrc-sdk/lib/ReactRenderer'
import './index.less';
import './supersonic.less';

declare global {
  interface Window {
    react: any,
    System: any,
    platforms: {
      apiHost: string
    }
  }
}

(async function () {
  window.platforms = { apiHost: 'http://localhost:9000' }

  await divSrcSDK.init({
    key: 'pb4854c445404a84dc77bd810537102d65',
    emulators: [{
      url: 'http://localhost:5556',
      components: ['@supersonic-micro-app-seed']
    }]
  })
  const reactRenderer: any = new ReactRenderer(divSrcSDK)
  const Artifact = reactRenderer.import('@supersonic-micro-app-seed')

  ReactDOM.render(<Artifact baseRoute={"/partners"} gap={"223px"} />, document.querySelector('#root'));

})()






