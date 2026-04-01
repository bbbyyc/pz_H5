interface Login{
  userName:string,
  passWord:string
}
interface createOrder{
    hospital_id: string,
    hospital_name: string,
    demand: string,
    companion_id: number,
    receiveAddress: string,
    tel: string,
    starttime: number
}
interface orderList{
  state:string
}
interface orderDetail{
  oid:string
}

import request from "../utils/request";

export default{

  // 登录接口
  login(data:Login){
    return request.post('/login',data)
  },

  // 首页数据接口
  index(){
    return request.get('/Index/index')
  },

  // 订单详情
  h5Companion(){
    return request.get('/h5/companion')
  },

  // 提交订单
  createOrder(data:createOrder){
    return request.post('/createOrder',data)
  },
  // 订单列表
  orderList(params:orderList){
      return request.get('/order/list',{
        params:params
      })
    },
  // 订单列表
  orderDetail(params:orderDetail){
      return request.get('/order/detail',{
        params:params
      })
    },
}

