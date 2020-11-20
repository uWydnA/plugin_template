import {createContext} from 'react'

interface ServiceContext {
  buttonService: any
  name: string
}

const ServiceContext = createContext<ServiceContext>({
  buttonService: {},
  name: '',
})
export default ServiceContext
