import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '@/style/global.less'

const bootstrap = {
  mount: (id) => {
    ReactDOM.render(<App />, document.getElementById(id || 'root'))
  }
}

window.__INAPPSMASTER || bootstrap.mount()
export default bootstrap.mount
