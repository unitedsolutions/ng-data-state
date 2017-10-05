import * as _       from 'lodash';
import urlProcessor from '../_lib/url-processor';

export default function(params) {
  let {url, data} = params;
  let {_id} = data;
  let index = _.findIndex(this.data, {_id});
  let [record] = this.data.splice(index, 1);
  url = urlProcessor.call(this, url);
  this.pendingDeleteId = _id;
  this.publish();

  let promise = this.http.delete(url, {params: data}).toPromise();
  
  promise.catch(() => {
    this.data.splice(index, 0, record);
    this.publish();
  });
  
  return promise;
}
