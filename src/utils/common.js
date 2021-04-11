/***
 * 判断输入是否为空
 * @param obj
 * @returns {boolean}
 */
export function isEmpty(obj) {
  return (obj === null || obj === undefined || ( isString(obj) && (obj.replace(/(^\s*)|(\s*$)/g,"") === "" || '')))
}

/***
 * 判断输入是否是字符串
 * @param obj
 * @returns {boolean}
 */
export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

/***
 * 判断参数是否是数组
 * @param obj
 * @returns {boolean}
 */
export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/***
 * 判断参数是否是对象
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断参数是否是函数
 * @param obj
 * @returns {boolean}
 */
function isFunction(obj) {
  return Object.prototype.toString.call(obj) === '[object Function]';
}


/***
 * 数组的浅拷贝拷贝
 * @param arr
 */
export function copy(arr) {
  return arr.slice(0);
}

export function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

/***
 * 对象的浅拷贝拷贝
 * @param p
 */
export function objCopy(p) {
  let c = {};
  for(let i in p){
    c[i] = p[i];
  }
  c.uber = p;
  return c;
}

export function objDeepCopy(p,current_c) {
  console.info(typeof p)
  let c = current_c || {};
  for(let i in p){
    if(isArray(p[i])){
      c[i] = [];
      deepCopy(p[i],c[i]);
    }else if(isObject(p[i])){
      c[i] = {};
      deepCopy(p[i],c[i]);
    }else {
      c[i] = p[i];
    }
  }
  //c.uber = p;
  console.info(typeof c)
  return c;
}



export function setIntervalNow(func, interval) {
  func();
return setInterval(func, interval);}
