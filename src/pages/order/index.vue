<template>
  <div class="container">
    <div class="header">我的订单</div>
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="全部" name="" />
      <van-tab title="待支付" name="1" />
      <van-tab title="待服务" name="2" />
      <van-tab title="已完成" name="3" />
      <van-tab title="已取消" name="4" />
    </van-tabs>
    <van-row v-for="item in order" :key="item.out_trade_no" @click="goDetail(item)">
    <van-col span="5">
      <van-image height="50" width="50" ridus="5" :src="item.serviceImg" />
    </van-col>
    <van-col span="14">
     <div class="text1">
      {{ item.service_name}}
     </div>
     <div class="text2">
      <div>{{ item.hospital_name}}</div>
      <div>预约时间{{ item.starttime}}</div>
     </div>
    </van-col>
    <van-col span="5" :style="{color:colorMap[item.trade_state]}" class="text2">
      {{ item.trade_state }}
      <counter :second="item.timer" v-if="item.trade_state==='待支付'"/>
    </van-col>
  </van-row>
  <div class="bottom-text">没有更多了...</div>
  </div>
</template>

<script setup>
import { ref,getCurrentInstance,onMounted} from 'vue'
import counter from "../../components/counter.vue";
import {useRouter} from 'vue-router'
// 获取当前Vue实例
const {proxy}=getCurrentInstance()

// 需要在首次挂载的时候调用一下订单列表的接口，不然刚进入页面不进行任何操作的时候，页面没有任何显示
onMounted(async (state)=>{
  getOrderList()
})
// 创建一个响应式数据来接受接口返回的内容
const order=ref([])

// 获取订单列表
const getOrderList=async (state)=>{
  const {data}=await proxy.$api.orderList({state})
  console.log(data,'订单列表data');
  // 订单提交有两个小时的支付时间,计算倒计时：
  data.data.forEach(item => {
    // 确保时间戳是数字，并且计算剩余时间
    const endTime = item.order_start_time + 7200000; // 开始时间 + 2小时
    item.timer = Math.max(0, endTime - Date.now()); // 确保不小于0
    console.log('timer',item.timer);
    
  });
  order.value=data.data

}
const active=ref('')

// 定义点击tab栏的点击事件
const onClickTab=(item)=>{
  getOrderList(item.name)
}

// 跳转详情页
const router=useRouter()
const goDetail=(item)=>{
  router.push(`/detail?oid=${item.out_trade_no}`)
}

// 订单状态显示
const colorMap={
  '待支付':'#ffa200',
  '待服务':'#1da6fd',
  '已完成':'#21c521'
}
</script>

<style lang="less">
.container {
    background-color: #f0f0f0;
    height: 100vh;
  }
  .header {
    background-color: #fff;
    line-height: 40px;
    text-align: center;
  }
  .van-row {
    background-color: #fff;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    .text1 {
      font-size: 16px;
      line-height: 25px;
      font-weight: bold;
    }
    .text2 {
      font-size: 14px;
      line-height: 20px;
      color: #999999;
    }
  }
  .bottom-text {
    line-height: 50px;
    text-align: center;
    color: #999999;
  }
</style>