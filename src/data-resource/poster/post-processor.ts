import * as _       from 'lodash';
import urlProcessor from '../_lib/url-processor';

export default function(params) {
  let {data, url} = params;
  let index = this.data.push(data) - 1;
  url = urlProcessor.call(this, url);
  this.pendingPostData = data;
  this.publish();
  let promise = this.http.post(this.url, data).toPromise();
  
  promise.catch(() => {
    this.data.splice(index, 1);
    this.publish();
  });
  
  return promise;
}
