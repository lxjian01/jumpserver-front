<template>
  <div class="refresh-content">
    <div class="center">
      <div style="float: left;">
        <i class="fa fa-signal" style="font-size: 260px;color: #666;"></i>
      </div>
      <div style="float: left;margin-left: 60px;">
        <h1 class="text-jumbo text-ginormous">DevOPS!</h1>
        <h2 style="margin-top: 20px;">服务器连接失败，请检查网络或稍后重试......</h2>
        <h4 style="margin-top: 20px;">如有需要，请联系管理员</h4>
        <div style="margin-top: 80px;">
          <el-button type="primary" @click="onRefresh"><i class="fa fa-mail-reply"></i>刷新</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'refresh-content',
    data() {
      return {

      }
    },
    methods: {
      // 通过跳转一个空页面再返回的方式来实现刷新当前页面数据的目的
      onRefresh () {
        this.$router.replace('/refresh');
      }
    }
  }
</script>

<style>
  .refresh-content{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .refresh-content .center{
    position: absolute;
    top:50%;
    left: 50%;
    margin-top: -220px;
    margin-left: -380px;
  }
</style>
