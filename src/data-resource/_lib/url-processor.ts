export default function(url) {
  if(url) {
    if(!url.startsWith('/')) {
      url = this.url + '/' + url;
    }
  } else {
    url = this.url;
  }
  
  return url;
}
