// 静态常量
// @author andy.wu
// @create 2020/11/23

export const ENV = process.env.NODE_ENV
export const BUILD_MODE = process.env.VUE_APP_MODE

/** 接口预设地址 开发地址/预发地址/线上地址 */
export const BASE_URL =
  ENV === 'development'
    ? 'http://127.0.0.1/7002'
    : BUILD_MODE === 'PRE'
    ? 'http://127.0.0.1/7002'
    : 'http://127.0.0.1/7002'

export const DB_BASE_URL =
  ENV === 'development'
    ? 'http://127.0.0.1/7002'
    : BUILD_MODE === 'PRE'
    ? 'http://127.0.0.1/7002'
    : 'http://127.0.0.1/7002'
