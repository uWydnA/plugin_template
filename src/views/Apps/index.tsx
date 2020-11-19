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

  const [isShowDrawer, setIsShowDrawer] = useState(false)
  const [activeAppName, setActiveAppName] = useState('')
  const onClose = () => {
    MicroAppsMaster.uninstallMicroAppByName(activeAppName, 'apps')
    setIsShowDrawer(false)
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

      <div id="inputBox"></div>
      <div id="reactpdf"></div>
    </div>
  )
}
