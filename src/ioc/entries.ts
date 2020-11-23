import {ContainerModule, injectable, inject} from 'inversify'
import 'reflect-metadata'
@injectable()
class LanguageService {
  public name: any
  constructor() {
    this.name = 'LanguageService'
  }
}

@injectable()
class Route {
  public router: any
  constructor() {
    this.router = [1, 2, 3, 4, 5]
  }
}

@injectable()
class AppService {
  private _languageService: any
  constructor(@inject('languageService') LanguageService: any) {
    this._languageService = LanguageService
  }
}

@injectable()
class AppRoute {
  public app: any
  public router: any
  constructor(@inject('router') Route: any) {
    this.app = 'approuter'
    this.router = Route
  }
}

@injectable()
class EventEmitter {
  public _events: any
  constructor() {
    this._events = Object.create(null)
  }

  on(type, handler) {
    ;(this._events[type] || (this._events[type] = [])).push(handler)
  }

  off(type, handler) {
    if (this._events[type]) {
      this._events[type].splice(this._events[type].indexOf(handler) >>> 0, 1)
    }
  }

  once(type, handler) {
    let fired = false
    const magic = (...arg) => {
      this.off(type, magic)
      if (!fired) {
        fired = true
        handler.apply(this, arg)
      }
    }

    this.on(type, magic)
  }

  emit(type, ...args) {
    const array = this._events[type] || []
    for (let i = 0; i < array.length; i++) {
      const handler = this._events[type][i]
      handler.apply(this, args)
    }
  }
}

export default new ContainerModule((bind) => {
  bind('EventEmitter').to(EventEmitter)
  bind('languageService').to(LanguageService)
  bind('router').to(Route)
  bind('AppService').to(AppService)
  bind('Approuter').to(AppRoute)
})
