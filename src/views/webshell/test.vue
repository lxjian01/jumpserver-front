<template>
  <div class="docker">
    <div id="terminal-container" style="width: 100%;height:100%;"></div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import 'xterm/css/xterm.css'
  import { Terminal } from 'xterm'
  import { AttachAddon } from 'xterm-addon-attach'
  import { FitAddon } from 'xterm-addon-fit'

  export default {
    name: 'index',
    data() {
      return {
        socket:undefined,
        socket_state:undefined,
        resizeParams:{
          type:"resize",
          rows:0,
          cols:0,
          height:0,
          width:0
        },
        copy:"",
      }
    },
    mounted: function () {
      this.xterm()
    },
    destroyed() {
      if(this.socket !== undefined){
        this.socket.close()
      }
    },
    methods: {
      async isLogin(){
        let result = await request.post(`/apis/deploy_job/changeDeployJobDetail`, data)
        this.$message.success("操作成功！")
      },
      xterm(){
        let login_token = Cookies.get("login_token")
        if ("WebSocket" in window) {
          if(this.isStringEmpty(login_token)){
            this.toLogin()
            return
          }

          document.title = "webshell test"
          let url = `${process.env.TERM_ROOT}/linux/dmc/aaa-api/10.248.224.41/aaa-api_358/${login_token}`
          console.info(url)
          this.socket = new WebSocket(url);
          // term
          const term = this.getTerm()
          let terminalContainer = document.getElementById('terminal-container');
          // Attach the socket to term
          const attachAddon = new AttachAddon(this.socket);
          term.loadAddon(attachAddon)
          // Make the terminal's size and geometry fit the size of #terminal-container
          const fitAddon = new FitAddon()
          term.loadAddon(fitAddon)
          term.open(terminalContainer, true);
          fitAddon.fit();
          term.focus();
          window.onresize = () => {
            fitAddon.fit();
            term.scrollToBottom();
          };
          console.info(term)
          this.socket.onopen  = () => {
            console.log('websocket open')
            let rows = term.rows
            let cols = term.cols
            this.resize(rows,cols)
          }
          term.onResize( data => {
            let rows = data.rows
            let cols = data.cols
            this.resize(rows,cols)
          })
          //选中 复制
          term.onSelectionChange( ()=> {
            if (term.hasSelection()) {
              document.execCommand("Copy");
            }
          })
          this.socket.onmessage = (event) => {
            let data = event.data
            this.socket_state = data
            if(data === "no_login"){  //根据后台返回的状态判断是登录还是消息
              this.toLogin()
            }else if(data === "no_permission") {
              term.write("! 你没有权限，请联系管理员！")
            }else if(data === "error") {
              term.write(`! 请联系管理员！`)
            }
          }
          // let it = 0
          // var t2 = window.setInterval( () => {
          //
          //   it = it +1
          //   console.info(it)
          //   this.socket.send("pwd")
          // },1000)
          // socket close
          this.socket.onclose = (event) => {
            window.clearInterval(t2)
            console.info(event)
            console.info(this.socket_state)
            if(this.socket_state !== undefined && this.socket_state !== "no_login" && this.socket_state !== "no_permission" && this.socket_state !== "error"){
              term.write('Session closed,you can try to refresh and reconnect a new terminal!');
            }
          }
          // socket error
          this.socket.onerror = (event) => {
            window.clearInterval(t2)
            this.socket_state = "error"
            term.write("WebSocket error observed,you can try to refresh and reconnect a new terminal!");
          }
        }else {
          // 浏览器不支持 WebSocket
          alert("您的浏览器不支持 WebSocket! 推荐使用谷歌浏览器。")
        }
      },
      resize(rows,cols){
        this.resizeParams.rows = rows
        this.resizeParams.cols = cols
        this.resizeParams.leight = document.body.scrollHeight
        this.resizeParams.width = document.body.scrollWidth
        let params = JSON.stringify(this.resizeParams)
        console.log(params)
        this.socket.send(params)
      },
      getUrlParams(){
        var url = "?" + window.location.href.split("?")[1];
        let theRequest = {}
        if (url.indexOf("?") !== -1) {
          let str = url.substr(1);
          let strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },
      getTerm(){
        let term = new Terminal({
          fontFamily: '"DejaVu Sans Mono", "Everson Mono", FreeMono, Menlo, Terminal, monospace',
          cursorBlink: true,
          fontSize: 15,
          scrollback: 99999,
          theme: {
            foreground: '#d2d2d2',
            background: '#2b2b2b',
            cursor: '#adadad',
            black: '#000000',
            red: '#d81e00',
            green: '#5ea702',
            yellow: '#cfae00',
            blue: '#427ab3',
            magenta: '#89658e',
            cyan: '#00a7aa',
            white: '#dbded8',
            brightBlack: '#686a66',
            brightRed: '#f54235',
            brightGreen: '#99e343',
            brightYellow: '#fdeb61',
            brightBlue: '#84b0d8',
            brightMagenta: '#bc94b7',
            brightCyan: '#37e6e8',
            brightWhite: '#f1f1f0',
          },
        })
        console.log('Xterm init ok...')
        return term
      },
      toLogin(){
        const current_route = process.env.FRONT_ROOT + '/#/webshell/docker'
        setTimeout(() => {
          Cookies.set("return_url",current_route,{ domain: process.env.COOKIE_DOMAIN });
          window.location.href = process.env.LOGIN_ROOT;
        }, 1000);
      },
      isStringEmpty(params){
        if(params === undefined || params === null || params === ""){
          return true
        }
        else{
          return false
        }
      }
    }
  }
</script>

<style>
  .docker{
    width: 100%;
    height: 100%;
  }
</style>
