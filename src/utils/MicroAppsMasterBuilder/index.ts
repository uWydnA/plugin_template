class MicroAppsMaster {
  public MicroApps: any
  public maps: any
  public mountedApps: any
  public path: any
  public host: any
  constructor({host = 'http://localhost:7002'} = {}) {
    this.MicroApps = null
    this.maps = {}
    this.mountedApps = []
    this.path = null
    this.host = host
    window.__INAPPSMASTER = true
    window.__inR = true
    /* global as */
    window.as = {}
  }
  fetchMicroAppsManifest = (api = '') => {
    if (typeof api === 'object') {
      this.maps = api
    }
    return this
  }
  registerMicroApps = async (MicroApps, {routerType = 'hash'} = {}) => {
    this.manifestMapsFormat(this.maps, MicroApps)
    if (routerType === 'hash') {
      const hashchangeCallback = (e) => {
        let urlGroup: any
        if (e) {
          urlGroup = e.newURL.split('#')
        } else {
          urlGroup = window.location.href.split('#')
        }
        this.path = urlGroup?.[urlGroup.length - 1]
        this.MicroApps.filter(
          (app) => !app.command && (app.path === this.path || app.path === '*')
        ).forEach(this.importModule)
      }
      // 初始化不会触发事件，需要手动调用一次
      hashchangeCallback(null)
      window.addEventListener('hashchange', hashchangeCallback, false)
    }
  }
  findMicroApps = ({packageName, container}) => {
    return this.MicroApps.find(
      (item) => packageName === item.packageName && container === item.container
    )
  }
  findMicroAppsModuleApply = (microAppPackageName) => {
    let Intervalid: any
    return new Promise((resolve, reject) => {
      const enterTime = Number(new Date())
      let during = Number(new Date())
      const app = this.MicroApps.find(
        (item) => microAppPackageName === item.packageName
      )
      // 如果应用被卸载，但前端配置未改变，这里做一个容错
      if (!app) resolve(() => {})
      // 轮询前可开始一次查找，若查找到应该跳过轮询
      if (app?.ModuleApply) {
        during = Number(new Date())
        console.log(during, enterTime)
        if (during - enterTime >= 8000000) resolve(() => {})
        clearInterval(Intervalid)
        resolve(app)
        return
      }
      // 轮询查找ModuleApply
      Intervalid = setInterval(() => {
        if (app?.ModuleApply) {
          clearInterval(Intervalid)
          resolve(app)
        }
      }, 100)
    })
  }
  installMicroAppByCommand = (command) => {
    this.MicroApps.filter((app) => app.command === command).forEach(
      this.importModule
    )
  }
  uninstallMicroAppByName = (name, container) => {
    const app = this.MicroApps.find((app) => app.packageName === name)
    console.log(this.MicroApps, name, app, 'app')

    app?.unmount?.(container)
  }
  manifestMapsFormat = (maps, MicroApps) => {
    // 将importmaps的描述与注册传入的数组对包名进行合并
    this.MicroApps = MicroApps.map((app) => {
      if (!maps.find((val) => val.packageName === app.packageName)) return false
      return {
        ...app,
        ...maps
          .filter((mapsapp) => mapsapp.packageName === app.packageName)
          .map((val) => ({
            packageName: val.packageName,
            cssEntry: val.entrypoints.filter((val) => /.css/.test(val)),
            jsEntry: val.entrypoints.filter((val) => /.js/.test(val)),
          }))[0],
      }
    }).filter((val) => val)
  }
  importCss = (packageName, cssEntry) => {
    return new Promise((resolve, reject) => {
      const importMaps = {imports: {}}
      cssEntry?.forEach((val) => {
        importMaps.imports[
          `${cssEntry}`
        ] = `/node_modules/${packageName}/${cssEntry}`
      })
      const importPomiseGroup: any = []
      Object.keys(importMaps.imports).forEach(async (key) => {
        importPomiseGroup.push(
          new Promise<any[] | any>((resolve, reject) => {
            if (!key || !importMaps.imports[key]) reject()
            const link = document.createElement('link')
            const linkFragement = [...document.querySelectorAll('link')].find(
              (dom) => dom.getAttribute('_name') === key
            )
            if (linkFragement) {
              resolve()
              return
            }
            link.href = `${this.host}/package${importMaps.imports[key]}`
            link.setAttribute('_name', key)
            link.setAttribute('rel', 'stylesheet')
            link.onload = () => {
              resolve()
            }

            link.onerror = () => {
              reject(
                new Error('Failed to load module link with URL ' + cssEntry)
              )
            }
            document.querySelector('head')?.appendChild(link)
          })
        )
      })
      Promise.all(importPomiseGroup).then(() => {
        resolve()
      })
    })
  }
  importScript = function (url) {
    return new Promise((resolve, reject) => {
      const count = Math.random().toString(32).substring(2)
      const script = document.createElement('script')
      const tempGlobal =
        '__tempModuleLoadingVariable' + Math.random().toString(32).substring(2)
      script.textContent = `
        try {
          System.import('${url}').then(m=>{
            window.${tempGlobal} = m
            window._importModule${count}.onloaded()
          })
        } catch (error) {
          window._importModule${count}.onerrored()
        }
      `
      window[`_importModule${count}`] = {}
      window[`_importModule${count}`].onloaded = () => {
        resolve(window[tempGlobal])
        delete window[tempGlobal]
        script.remove()
      }

      window[`_importModule${count}`].onerrored = () => {
        reject(new Error('Failed to load module script with URL ' + url))
        delete window[tempGlobal]
        script.remove()
      }
      document.documentElement.appendChild(script)
    })
  }
  importModule = async (app) => {
    if (!app.error) {
      // 当应用索引远程完成后，内存缓存并跳过索引，下次挂载可直接用内存缓存中的包
      try {
        if (app.Module) {
          app.ModuleApply = app.Module.apply(app.Module, [app.container])
          return
        }
        const {cssEntry} = this.findMicroApps(app)
        await this.importCss(app.packageName, cssEntry)
        const {default: Module}: any = await this.importScript(app.packageName)
        if (typeof Module === 'function') {
          app.Module = Module
          app.ModuleApply = Module.apply(app.Module, [app.container])
          app.ModuleApply && (window.as[app.packageName] = app.ModuleApply)
        } else if (typeof Module === 'object') {
          const {mount = () => {}, unmount = () => {}} = Module
          app.Module = mount
          app.unmount = unmount
          app.ModuleApply = app.Module.apply(app.Module, [app.container])
          app.ModuleApply && (window.as[app.packageName] = app.ModuleApply)
        }
        app.enterFlag = true
        this.mountedApps.push(app)
      } catch (error) {
        app.error = error
        console.error(error)
      }
    }
  }
}
export default (props) => new MicroAppsMaster(props)
