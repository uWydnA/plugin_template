import React from 'react'
import styles from './style/App.module.less'
import Router from './router'
function App() {
  return (
    <div className={styles.App}>
      <Router />
    </div>
  )
}
export default App
