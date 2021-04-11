<template>
  <el-container class="index">
    <el-header height="50px" style="background-color: #2b3643;color: #333;height: 50px;line-height: 50px;">
      <div class="monitor-menu" style="display: inline-block;margin-left: 6px;float: left;width: 138px;" @click="gotoHome">
        <i class="iconfont icon-cloud" style="width: 30px;height: 30px;color: #1296db;font-size: 22px;float: left;font-weight: bold;"></i>
        <span style="margin-left: 8px;color: #fff;font-size: 14px;float: left;">技术平台</span>
      </div>
    </el-header>
    <el-container class="el-container-center">
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<script>
  import {deepCopy,isEmpty} from "@/utils/common"
  import Cookies from 'js-cookie'

  export default {
    name: "index",
    data() {
      return {
        selectMainMenuName:"",
        headMenuData: null,
        userMenuData:[],
        isEmpty:isEmpty,
        login_user_name:'',
        elMainStyle:{
          width:document.body.scrollWidth-230,
        },
        mainMenuStyle:{
          clear:"both",
          visibility:"hidden"
        },
        leftTreeFilterText: '',
        leftTreeDefaultProps: {
          children: 'children',
          label: 'name',
        },
        leftTreeData:[],
        breadcrumbList:[],
        leftTreeDefaultExpandedKeys:[],
        leftTreeCurrentNodekey:"",
      }
    },
    mounted: function () {
      this.login_user_name = Cookies.get("login_user_name")
      let curent_menu = "/home"
      this.$store.commit('setCurrentMenu',curent_menu)
      this.$router.push({name:curent_menu});
    },
    methods: {
      //返回首页
      gotoHome(){
        this.$router.push('/home');
      },
    }
  }
</script>

<style>
  .index .el-input-group__append, .el-input-group__prepend{
    border-radius: 0;
    padding-left: 15px;
    padding-right: 15px;
  }
  .index .el-menu-horizontal-head.el-menu--horizontal.el-menu>.el-submenu.is-active .el-submenu__title {
    background-color: #36c6d3 !important;
    border:none;
    color: #fff;
  }
  .index .el-menu-horizontal-main.el-menu--horizontal.el-menu{
    height: 46px;
    line-height: 46px;
  }
  .index .el-menu-horizontal-main.el-menu--horizontal>.el-menu-item{
    height: 46px;
    line-height: 46px;
  }
  .index .el-menu-horizontal-main.el-menu--horizontal>.el-submenu .el-submenu__title{
    height: 46px;
    line-height: 46px;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content>.el-tree-node__expand-icon{
    padding: 0;
  }
  .index .el-aside>.filter-tree .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .index .el-aside>.filter-tree .el-icon-caret-right:before {
    content: "\e723";
    font-size: 14px;
  }
  .index .el-aside>.filter-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: "\e722";
    font-size: 14px;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content>.el-tree-node__expand-icon{
    margin-top: 2px;
  }
</style>

<style scoped>
  .index{
    width: 100%;
    height: 100%;
  }
  .index .el-aside{
    overflow: hidden;
  }
  /*monitor-menu*/
  .index .monitor-menu{
    float: left;
    margin-left: 20px;
    text-align: center;
    height: 50px;
    width: 60px;
    color: #fff;
  }
  .index .monitor-menu:hover{
    background-color: #3f4f62;
    cursor: pointer;
  }
  /*index-header-list*/
  .index .index-header-list ul {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .index .index-header-list ul li {
    margin: 0;
    padding: 0 15px;
    text-align: center;
    color: white;
    float: left;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #2a2f32;
    font-size: 14px;
  }
  .index .index-header-list ul li:first-child{
    border-left: 1px solid #2a2f32;
  }
  .index .index-header-list ul li:hover {
    background-color: #3f4f62;
  }
  .index .index-header-list ul li:last-child {
    border: none;
  }
  /*prop hint text*/
  .index-hint-content{
    margin: 0;
    padding: 0;
  }
  .index-hint-content>li{
    margin: 0;
    padding: 6px 20px;
  }
  .index-hint-content>li:hover{
    color: #00C1DE;
    cursor: pointer;
  }
  .el-menu{
    border-right: none;
  }
  /*el-container-center*/
  .index .el-container-center{
    height: calc(100% - 50px);
  }
  .index .el-container-center .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .index .el-container-center .el-aside ul{
    width: 230px;
    height: 32px;
    line-height: 32px;
    float: left;
    margin: 0;
    padding: 0;
    background-color: #fff;
  }
  .index .el-container-center .el-aside ul li{
    box-sizing: border-box;
    height: 100%;
    width: 55px;
    float: left;
    text-align: center;
    font-size: 13px;
    border-right: 1px solid #e4e7ed;
    cursor: pointer;
  }
  .index .el-container-center .el-aside ul li .active{
    color: #409eff;
  }
  .index .el-container-center .el-aside>.ul_li_active{
    color: rgb(64, 158, 255);
  }
  .index .el-container-center .el-aside>.filter-tree{
    height: calc(100% - 32px);
    width: 230px;
    min-width: 230px;
    clear: both;
    text-align: left;
    overflow-x: hidden;
    box-sizing: border-box;
    background: #364150 !important;
    font-size: 14px;
    color: rgb(191, 203, 217);
    padding-left: 2px;
    padding-top: 3px;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content {
    background: #364150 !important;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content:active{
    background: #364150 !important;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content:hover{
    background: #364150 !important;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content:focus{
    background: #364150 !important;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content:visited{
    background: #364150 !important;
  }
  .index .el-container-center .el-aside>.filter-tree .el-tree-node__content:focus-within{
    background: #364150 !important;
  }

  /*el-main*/
  .index .el-container-center>.el-main {
    padding: 0;
    margin: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

</style>
