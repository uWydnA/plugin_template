import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
function TabBarLayout() {
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState(history.location.pathname)
  const [hidden, setHidden] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  return (
    <div
      className="tab-bar"
      style={
        fullScreen
          ? {position: 'fixed', height: '100%', width: '100%', top: 0}
          : {height: 'auto', position: 'fixed', bottom: 0, width: '100%'}
      }>
      <button
        onClick={() => {
          setHidden(!hidden)
        }}>
        hidden
      </button>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
        hidden={hidden}>
        <TabBar.Item
          title="Home"
          key="Home"
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selected={selectedTab === '/home'}
          badge={0}
          onPress={() => {
            history.push('/home')
            setSelectedTab('/home')
          }}
          data-seed="logId"></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="Docs"
          key="Docs"
          badge={0}
          selected={selectedTab === '/user'}
          onPress={() => {
            history.push('/user')
            setSelectedTab('/user')
          }}
          data-seed="logId1"></TabBar.Item>
        <TabBar.Item
          icon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          selectedIcon={
            <div
              style={{
                width: '22px',
                height: '22px',
                background:
                  'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
              }}
            />
          }
          title="Apps"
          key="Apps"
          dot
          selected={selectedTab === 'apps'}
          onPress={() => {
            history.push('/apps')
            setSelectedTab('/apps')
          }}></TabBar.Item>
        <TabBar.Item
          icon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg',
          }}
          selectedIcon={{
            uri:
              'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg',
          }}
          title="Me"
          key="Me"
          selected={selectedTab === 'mine'}
          onPress={() => {
            history.push('/mine')
            setSelectedTab('/mine')
          }}></TabBar.Item>
      </TabBar>
    </div>
  )
}

export default () => <TabBarLayout />
