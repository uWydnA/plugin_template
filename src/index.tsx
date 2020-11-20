import React from 'react'
import ReactDOM from 'react-dom'
import App from './demo'
import './style/global.less'
import {ContainerModule, injectable, inject} from 'inversify'
import 'reflect-metadata'
import ServiceContext from './context'
@injectable()
class modalService {
  public bootstrap: any
  public eventEmitter: any
  public buttonService: any
  constructor(
    @inject('EventEmitter') EventEmitter: any,
    @inject('ButtonService') ButtonService: any
  ) {
    this.eventEmitter = EventEmitter
    this.buttonService = ButtonService
    this.bootstrap = (id: string) => {
      ReactDOM.render(
        <ServiceContext.Provider
          value={{buttonService: this.buttonService, name: '1111'}}>
          <App />
        </ServiceContext.Provider>,
        document.getElementById(id || 'root')
      )
    }
    this.init()
  }
  init() {
    this.eventEmitter.on('onCommand:modal', (res) => {
      // eslint-disable-next-line no-console
      console.log('modal ', res?.content)
    })
  }
}

const appModule = new ContainerModule((bind) => {
  bind('modal_plugin').to(modalService)
})

export default {type: 'modal_plugin', entries: appModule}
