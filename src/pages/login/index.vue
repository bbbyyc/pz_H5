<template>
  <h1>用户登录</h1>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
      <van-field
        v-model="form.userName"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.passWord"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import { reactive,getCurrentInstance } from 'vue'
import {useRouter} from 'vue-router'

const router=useRouter()

// 要调用接口前的准备工作:获取当前的Vue实例
const {proxy}=getCurrentInstance()

const form=reactive({
  userName:'',
  passWord:''
})
// 提交表单且验证通过后触发
const onSubmit=async ()=>{
  const {data}=await proxy.$api.login({
      userName: form.userName,
      passWord: form.passWord
    })
  console.log('接口返回data:', data) // 新增这行，看真实code
  if(data.code===10000){
    console.log(data.data);
    localStorage.setItem('h5_token',data.data.token)
    localStorage.setItem('h5_userInfo',JSON.stringify(data.data.userInfo))
    router.push('/home')
  }
}
/* const onSubmit = async () => {
  console.log("======== 点击登录 ========")

  try {
    // 关键：先打印参数
    console.log("登录参数：", form)

    // 调用接口
    const res = await proxy.$api.login(form)

    // 如果能走到这里，说明接口返回了！
    console.log("接口成功返回：", res)

    const { data } = res
    if (data.code === 10000) {
      console.log("登录成功！token：", data.data.token)

      localStorage.setItem("h5_token", data.data.token)
      localStorage.setItem("h5_userInfo", JSON.stringify(data.data.userInfo))

      router.push("/home")
    } else {
      alert(data.message || "登录失败")
    }
  } catch (err) {
    // 所有错误都会被抓住！
    console.error("登录报错：", err)
    alert("登录接口调用失败！")
  }
} */
</script>

<style lang="less">
h1{
  text-align: center;
}

</style>