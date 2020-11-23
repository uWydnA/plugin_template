import React, {useState} from 'react'
import MicroAppsMaster from '../../utils/MicroAppsMaster'
import AppsList from '../../components/AppsList'
import {Drawer} from 'antd'
type Props = {
  dataList?: any
  setIsShowDrawer?: any
  setActiveAppName?: any
}
export default () => {
  const placement = 'bottom'
  setTimeout(() => {
    const search = MicroAppsMaster.BundleActivator('search')
    console.log(search.eventEmitter, 'search.eventEmitter')

    search.eventEmitter.on('searchValue', (res) => {
      // eslint-disable-next-line no-console
      console.log('searchValue', res)
    })
  }, 2000)

  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [activeAppName, setActiveAppName] = useState('')
  const onClose = () => {
    MicroAppsMaster.uninstallMicroAppByName(activeAppName, 'apps')
    setIsShowDrawer(false)
  }
  const handleClick = () => {
    const modal = MicroAppsMaster.BundleActivator('modal').instace
    modal.showModal({
      title: 1,
      content: 12312312,
    })
  }
  return (
    <div>
      <AppsList
        dataList={MicroAppsMaster.MicroApps}
        setIsShowDrawer={setIsShowDrawer}
        setActiveAppName={setActiveAppName}
      />
      <Drawer
        title="Basic Drawer"
        placement={placement}
        closable={false}
        height={760}
        onClose={onClose}
        visible={isShowDrawer}
        key={placement}>
        <div id="apps">apps</div>
      </Drawer>

      <div id="inputBox">
        <button onClick={handleClick}>EventEmitter</button>
      </div>
      <div id="searchBar">searchBar</div>
    </div>
  )
}
