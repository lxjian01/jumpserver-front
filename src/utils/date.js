/******
 * 格式化当前日期
 * @param fmt
 * @returns {*}
 * @constructor
 */
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
/***
 * 格式化当前时间并加/减去几天
 * @param fmt
 * @param mdays
 * @returns {*}
 * @constructor
 */
Date.prototype.formatMinusDay = function (fmt, mdays) {
  this.setDate(this.getDate()+(mdays));//设置天数 -1 天
  return this.format(fmt);
};
/***
 * 格式化当前时间并加/减去几个月
 * @param fmt
 * @param mMonth
 * @returns {*}
 * @constructor
 */
Date.prototype.formatMinusMonth = function (fmt, mMonth) {
  this.setMonth(this.getMonth()+(mMonth));//设置月数 -1 月
  return this.format(fmt);
};
