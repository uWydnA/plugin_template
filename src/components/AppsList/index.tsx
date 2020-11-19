import React, {useState} from 'react'
import {List, Avatar, message} from 'antd'
import asyncComponent from '../asyncComponent'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './index.module.less'
import MicroAppsMaster from '../../utils/MicroAppsMaster'
export default asyncComponent(async () => {
  return ({dataList, setIsShowDrawer, setActiveAppName}) => {
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const handleInfiniteOnLoad = () => {
      setLoading(true)
      if (dataList.length > 14) {
        message.warning('Infinite List loaded all')
        setHasMore(false)
        return
      }
      fetchData((res) => {})
    }
    const fetchData = (callback) => {
      console.log('fetchData')
    }
    const openSchema = (name) => {
      setIsShowDrawer(true)
      setActiveAppName(name)
      MicroAppsMaster.installMicroAppByCommand(name)
    }
    return (
      <div className={styles['infinite-container']}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}>
          <List
            itemLayout="vertical"
            dataSource={dataList}
            renderItem={(item: any, index) => (
              <List.Item
                actions={[
                  <div
                    onClick={() => {
                      openSchema(item.packageName)
                    }}
                    key="list-loadmore-edit">
                    edit
                  </div>,
                ]}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  key={index}
                />
                {item.packageName}
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    )
  }
})
