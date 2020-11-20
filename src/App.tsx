import React, {useContext} from 'react'
import styles from './style/App.module.less'
import ServiceContext from './context'
type Props = {
  service: any
}
function App<Props>() {
  const handleClick = (e) => {
    console.log(e?.eventEmitter?.emit('onCommand:hello', {content: 'from zhu'}))
  }
  const obj = useContext(ServiceContext)
  return (
    <div className={styles.App}>
      {JSON.stringify(obj)}
      {obj.name}
      <button onClick={() => handleClick(obj.buttonService)}>
        modal_plugin
      </button>
    </div>
  )
}
export default App
