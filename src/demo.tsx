import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
export default () => {
  const [count, setCount] = useState(0)
  const input: any = useRef(null)

  const getNumUseMemo = useMemo(() => {
    return `${+new Date()} ${count}`
  }, [count])

  const getList = useCallback((n) => {
    return Array.apply(Array, Array(n)).map((item, i) => ({
      id: i,
      name: '张三' + i,
    }))
  }, [])

  return (
    <>
      <Child getList={getList} ref={input} />
      <div>{getNumUseMemo}</div>
      <button onClick={() => input.current.setValue((val) => val + 1)}>
        累加子组件的value
      </button>
      <button
        onClick={() => {
          setCount(count + 1)
          console.log(input)
        }}>
        count+1
      </button>
    </>
  )
}

const Child = React.memo(
  forwardRef(({getList}: any, ref: any) => {
    console.log('child-render')
    const [value, setValue] = useState(0)
    useImperativeHandle(ref, () => ({
      setValue,
      someValue: 'test',
    }))
    return (
      <>
        {getList(10).map((item) => (
          <div key={item.id}>
            id：{item.id}，name：{item.name}
          </div>
        ))}
        <div>value:{value}</div>
        <input type="text" ref={ref} />
      </>
    )
  })
)
