/**
 * UrlEncoder
 * @params {object} obj
 * @return {String} Encoded payload string
 */
export default function UrlEncoder(obj) {
  var str = [];
  for(var p in obj)
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}
