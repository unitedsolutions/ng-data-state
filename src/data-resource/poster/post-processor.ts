import * as _ from 'lodash';

export default function(data, options) {
  this.pendingPostData = data;
  let index = this.data.push(data) - 1;
  this.publish();
  let promise = this.http.post(this.url, data, options).toPromise();
  
  promise.catch(() => {
    this.data.splice(index, 1);
    this.publish();
  });
  
  return promise;
}
