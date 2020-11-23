import React, {useState} from 'react'
import {List, Avatar, message} from 'antd'
import asyncComponent from '../asyncComponent'
import InfiniteScroll from 'react-infinite-scroller'
import styles from './index.module.less'

export default asyncComponent(async () => {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]
  return () => {
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const handleInfiniteOnLoad = () => {
      setLoading(true)
      if (data.length > 14) {
        message.warning('Infinite List loaded all')
        setHasMore(false)
        setHasMore(false)
        return
      }
      fetchData((res) => {})
    }
    const fetchData = (callback) => {}
    return (
      <div className={styles['infinite-container']}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}>
          <div id="modal_plugin">modal_plugin</div>
          <div id="app_template">app_template</div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <div onClick={console.log} key="list-loadmore-edit">
                    edit
                  </div>,
                ]}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  key={index}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    )
  }
})
