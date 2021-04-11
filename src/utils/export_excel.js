export function s2ab (s) {
  if (typeof ArrayBuffer !== 'undefined') {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  } else {
    let buf = new Array(s.length);
    for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }
}
