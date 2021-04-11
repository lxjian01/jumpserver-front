'use strict'

/***
 * 方式1：api程序在本地，后台启动host配置成dev-dop.jianxiaoli.com:8003，电脑的host配置127.0.0.1 dev-dop.jianxiaoli.com，API_ROOT配置成dev-dop.jianxiaoli.com:8003
 * 方式2：api程序在虚拟机，后台启动host配置成虚拟机ip:8003，电脑的host配置127.0.0.1 dev-dop.jianxiaoli.com和ip dev-api-dop.jianxiaoli.com，API_ROOT配置成dev-api-dop.jianxiaoli.com:8003
 * @type {{API_ROOT_DNS_TOKEN: string, COOKIE_DOMAIN: string, API_ROOT_DNS: string, FRONT_ROOT: string, API_ROOT: string, LOGIN_ROOT: string, NODE_ENV: string, CONFIG_TEXT: string}}
 */

module.exports = {
  NODE_ENV: '"local"',
  API_ROOT: '"//local-devops-web.jianxiaoli.com:8010"',
  TERM_ROOT: '"ws://local-devops-webshell.jianxiaoli.com:8010/webshell"',
  CONFIG_TEXT: '"测试环境配置"',
  LOGIN_ROOT: '"//dev-login.jianxiaoli.com"',
  FRONT_ROOT: '"//local-devops-webshell-front.jianxiaoli.com:9010"',
  COOKIE_DOMAIN: '".jianxiaoli.com"',
};
