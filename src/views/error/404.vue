<template>
  <div class="error404">
    <div style="width: 100%;height: 100%;">
      <div style="vertical-align: middle;height: 100%;position: relative">
        <div style="width: 50%;position: absolute;top: 25%;left: 8%;text-align: right">
          <img src="/static/img/404.png" width="80%" alt="Girl has dropped her ice cream.">
        </div>
        <div style="width: 40%;position: absolute;top: 33%;left: 58%;text-align: left;">
          <h1 class="text-jumbo text-ginormous">DevOPS!</h1>
          <h2 style="margin-top: 20px;">你访问的页面不存在......</h2>
          <h4 style="margin-top: 20px;">请检查您输入的网址是否正确<span><a href="#"
                                                              @click.prevent="dialogVisible=true">点我看图</a></span></h4>
          <div style="margin-top: 80px;">
            <el-button @click="home" size="medium"><i style="font-size: 14px;" class="iconfont icon-home1"></i>首页</el-button>
            <el-button type="primary" @click="back" size="medium" icon="iconfont icon-return">返回</el-button>
          </div>
        </div>
        <el-dialog title="随便看" :close-on-click-modal="false" :visible.sync="dialogVisible">
          <img :src="ewizardClap" class="pan-img">
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'page404',
    data() {
      return {
        ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
        dialogVisible: false
      }
    },
    methods: {
      home() {
        this.$router.push({path: '/home'})
      },
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({path: '/home'})
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style>
  .error404{
    width: 100%;
    height: 100%;
  }
</style>
