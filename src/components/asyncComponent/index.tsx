import React from 'react'
import {Skeleton} from 'antd'

interface State {
  module: any
}
interface Props {
  loading?: any
  error?: any
  dataList?: any
  setIsShowDrawer?: any
  setActiveAppName?: any
}

function asyncComponent(loadComponent) {
  class AsyncComponent extends React.Component<Props, State> {
    static defaultProps = {
      loading: <Skeleton active />,
      error: <p>Error</p>,
    }
    static timeout = 2000
    constructor(props) {
      super(props)
      this.load = this.load.bind(this)
      this.state = {
        module: null,
      }
    }

    componentWillMount() {
      this.load(this.props)
    }
    load(props) {
      this.setState({
        module: props.loading,
      })
      loadComponent(this.props)
        .then((m) => {
          const Module = m.default ? m.default : m
          this.setState({
            module: <Module {...this.props} />,
          })
        })
        .catch((error) => {
          this.setState({
            module: props.error,
          })
          console.error(error)
        })
    }
    render() {
      return this.state.module
    }
    componentWillUnmount() {
      this.setState = () => {}
    }
  }

  return AsyncComponent
}
export default asyncComponent
