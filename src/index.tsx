import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style/global.less'

const bootstrap = {
  mount: (id: string) => {
    ReactDOM.render(<App />, document.getElementById(id || 'root'))
  },
}

bootstrap.mount('')
export default bootstrap.mount
