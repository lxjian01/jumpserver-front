<template>
  <div class="linux">
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
        timerResize:undefined,
        socket:undefined,
        term:undefined,
        socket_state:undefined,
        terminal:"",
        resizeParams:{
          type:"resize",
          rows:0,
          cols:0,
          height:0,
          width:0
        }
      }
    },
    mounted: function () {
      this.terminal = this.$route.params["terminal"]
      console.info(this.terminal)
      this.term = this.getTerm()
      this.xterm()
    },
    beforeDestroy() {
      if(this.timerResize !== undefined){
        clearTimeout(this.timerResize)
      }
      if(this.socket !== undefined){
        this.socket.close()
      }
      if(this.term !== undefined){
        this.dispose.close()
      }
    },
    methods: {
      xterm(){
        if ("WebSocket" in window) {
          const params = this.getUrlParams()
          let login_token = Cookies.get("login_token")
          let project_code = params["project_code"]
          let module_code = params["module_code"]
          let deploy_job_host_id = params["deploy_job_host_id"]
          let host = params["host"]
          if(this.isStringEmpty(login_token)){
            this.toLogin()
            return
          }
          if(this.isStringEmpty(project_code) || this.isStringEmpty(module_code) || this.isStringEmpty(deploy_job_host_id) || this.isStringEmpty(host)){
            alert("错误地址，地址格式如：http://127.0.0.1/#/webshell/linux?project_code=aaa&module_code=bbb&host=127.0.0.1&deploy_job_host_id=1")
            return
          }
          document.title = host
          let url = `${process.env.TERM_ROOT}/${this.terminal}/${project_code}/${module_code}/${host}/${deploy_job_host_id}/${login_token}`
          this.socket = new WebSocket(url);
          let terminalContainer = document.getElementById('terminal-container');
          // Attach the socket to term
          const attachAddon = new AttachAddon(this.socket);
          this.term.loadAddon(attachAddon)
          // Make the terminal's size and geometry fit the size of #terminal-container
          const fitAddon = new FitAddon()
          this.term.loadAddon(fitAddon)
          this.term.open(terminalContainer, true);
          fitAddon.fit();
          this.term.focus();
          window.onresize = () => {
            fitAddon.fit();
            this.term.scrollToBottom();
          };
          console.info(this.term)
          this.socket.onopen  = () => {
            console.log('websocket open')
            let rows = this.term.rows
            let cols = this.term.cols
            this.resize(rows,cols)
          }
          this.term.onResize( data => {
            let rows = data.rows
            let cols = data.cols
            this.resize(rows,cols)
          })
          //选中 复制
          this.term.onSelectionChange( ()=> {
            if (this.term.hasSelection()) {
              document.execCommand("Copy");
            }
          })
          this.socket.onmessage = (event) => {
            let data = event.data
            this.socket_state = data
            if(data === "----no login----"){  //根据后台返回的状态判断是登录还是消息
              this.toLogin()
            }else if(data === "----no permission----") {
              this.term.write("! 你没有权限，请联系管理员！")
            }else if(data === "----error----") {
              this.term.write(`! 请联系管理员！`)
            }
          }
          // socket close
          this.socket.onclose = (event) => {
            console.info(this.socket_state)
            if(this.socket_state !== undefined && this.socket_state !== "----no login----" && this.socket_state !== "----no permission----" && this.socket_state !== "----error----"){
              this.term.write('Session closed,you can try to refresh and reconnect a new terminal!');
            }
          }
          // socket error
          this.socket.onerror = (event) => {
            this.socket_state = "----error----"
            this.term.write("WebSocket error observed,you can try to refresh and reconnect a new terminal!");
          }
          this.timerResize = setInterval(()=>{
            let rows = this.term.rows
            let cols = this.term.cols
            this.resize(rows,cols)
          }, 30000);
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
        const current_route = process.env.FRONT_ROOT + '/#/webshell/linux'
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
  .linux{
    width: 100%;
    height: 100%;
  }
</style>
