import {Typography, Button} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import React from 'react'
import MicroAppsMaster from '../../utils/MicroAppsMaster'
import asyncComponent from '../asyncComponent'
export default asyncComponent(async () => {
  const app: any = await MicroAppsMaster.findMicroAppsModuleApply(
    'react_plugin'
  )

  const activeModule = app.ModuleApply
  return ({item, index}) => (
    /* global as */
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Typography.Text mark>{item}</Typography.Text>
        <span onClick={() => {}}>{index}</span>
        <Button
          type="dashed"
          shape="circle"
          icon={<DownOutlined />}
          onClick={activeModule}
        />
      </div>
    </div>
  )
})
