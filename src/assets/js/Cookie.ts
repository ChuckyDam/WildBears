  export function setCookie(name: string, value: string, time: number) {
    var date = new Date();
    date.setTime(date.getTime() + (time * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + ";"
  }
  
  export function getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function deleteCookie(name: string){
    setCookie(name, "", -1);
  }
  
  let Cookie = {setCookie, getCookie, deleteCookie};
  
  export default Cookie;