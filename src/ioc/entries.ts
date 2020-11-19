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

export default new ContainerModule((bind) => {
  bind('languageService').to(LanguageService)
  bind('router').to(Route)
  bind('AppService').to(AppService)
  bind('Approuter').to(AppRoute)
})
