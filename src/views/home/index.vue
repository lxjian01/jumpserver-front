<template>
  <div class="home">
    <div class="content">
      <el-row style="padding: 10px;"><span style="font-size: 22px;">{{ this.login_user_name }}，欢迎你！</span></el-row>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  export default {
    name: "home",
    data() {
      return {
        login_user_name:'',
      }
    },
    mounted() {
      this.login_user_name = Cookies.get("login_user_name")
    },
    methods: {

    }
  }
</script>

<style>
  .home {
    width: 100%;
    height: 100%;
    overflow-y: auto !important;
    background-color: #f0f2f5;
  }

  .content{
    width: 100%;
    height: calc(100% - 30px);
    padding: 0 10px 38px 10px;
    box-sizing: border-box;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  .grid-content {
    border-radius: 4px;
    height: 116px;
    line-height: 116px;
    color: white;
    font-weight: bold;
    text-align: center;
  }

  .grid-content-ops {
    border-radius: 4px;
    height: 116px;
    line-height: 116px;
    color: white;
    font-weight: bold;
    text-align: center;
  }

</style>
