import * as _ from 'lodash';

export default function(options) {
  let {_id} = options.params;
  let index = _.findIndex(this.data, {_id});
  let [record] = this.data.splice(index, 1);
  this.pendingDeleteId = _id;
  this.publish();
  let promise = this.http.delete(this.url, options).toPromise();
  
  promise.catch(() => {
    this.data.splice(index, 0, record);
    this.publish();
  });
  
  return promise;
}
