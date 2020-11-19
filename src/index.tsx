import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style/global.less'
import MicroAppsMaster from './utils/MicroAppsMaster'
import request from './api/request'
import microAppsConfig from './const/microAppsConfig'
import vconsole from 'vconsole'
new vconsole()

const bootstrap = {
  mount: (id: string) => {
    ReactDOM.render(<App />, document.getElementById(id || 'root'))
  },
}

request('http://127.0.0.1:7002/package', {method: 'GET'}).then(
  ({packageApps}) => {
    MicroAppsMaster.fetchMicroAppsManifest(packageApps)
      .registerMicroApps(microAppsConfig)
      .then(() => {
        bootstrap.mount('root')
      })
  }
)
export default bootstrap.mount
