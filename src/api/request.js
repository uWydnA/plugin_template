import Axios from 'axios'
import qs from 'qs'
import {BASE_URL, DB_BASE_URL} from './const'

const axiosConfig = {
  baseURL: BASE_URL,
  retry: 4,
  retryDelay: 4000,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: true,
}

const bdAxiosConfig = {
  baseURL: DB_BASE_URL,
  retry: 4,
  retryDelay: 4000,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  credentials: false,
}

export default function request(url, data) {
  const {method, params} = data
  const formatMethod = method.toLowerCase()
  let formatDate = {...params}
  if (formatMethod === 'get') formatDate = {params: formatDate}
  const HttpSendType =
    formatMethod === 'post'
      ? Axios.create(axiosConfig).post
      : Axios.create(axiosConfig).get
  return HttpSendType(url, formatDate)
    .then((res) => {
      const {status = 0} = res
      if (status === 200) {
        return Promise.resolve(res.data)
      } else {
        console.error('登录过期请退出重新登录')
      }
    })
    .catch((err) => {
      console.error(err)
    })
}

export function httpRequest(url, data, formType = 'json', timeout = 0) {
  const {method, params} = data
  const {token, ...otherProps} = params
  const formatMethod = method.toLowerCase()
  let formatDate = {...otherProps}
  // bdAxiosConfig.headers.bmsToken = token

  if (timeout) bdAxiosConfig.timeout = timeout
  // console.log('bdAxiosConfig==>', bdAxiosConfig, formType)

  if (formType.toLowerCase() === 'form') {
    bdAxiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  } else if (formType.toLowerCase() === 'formdata') {
    bdAxiosConfig.headers['Content-Type'] = 'multipart/form-data'
  } else {
    bdAxiosConfig.headers['Content-Type'] = 'application/json'
  }

  console.log('httpRequest==>', url, token)

  if (formatMethod === 'get') formatDate = {params: formatDate}
  if (formatMethod === 'post' && formType.toLowerCase() === 'form')
    formatDate = qs.stringify(formatDate)
  const HttpSendType =
    formatMethod === 'post'
      ? Axios.create(bdAxiosConfig).post
      : Axios.create(bdAxiosConfig).get

  return HttpSendType(url, formatDate)
    .then((res) => {
      // return Promise.resolve(res.data);
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data)
      }
      const {status = true} = res.data
      if (status === true) {
        return Promise.resolve(res.data)
      } else {
        console.error(res.data.message || '登服务器异常')
      }
    })
    .catch((err) => {
      console.error('网络开小差了')
    })
}
