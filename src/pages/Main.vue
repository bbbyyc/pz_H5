<template>
  <!-- 路由出口 - 这里会渲染首页、订单页、我的页 -->
  <router-view />
  <van-tabbar v-model="active">
  <van-tabbar-item
    v-for="items in router.options.routes[0].children"
    :key="items.path"
    :icon="items.meta.icon"
    :url="`#/${items.path}`">{{ items.meta.name }}</van-tabbar-item>
</van-tabbar>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import {useRoute,useRouter} from 'vue-router'

const active=ref(0)

// 拿到的是全局路由对象
const router=useRouter()
// 拿到的是当前路由实例，获取当前路由信息
const route=useRoute()

onMounted(()=>{
  console.log('router',router);
  console.log('layout页面route',route);
  active.value=router.options.routes[0].children.findIndex(items=>'/'+items.path===route.meta.path)
})

</script>

<style>

</style>