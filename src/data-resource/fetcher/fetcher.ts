import * as _ from 'lodash';

export default function(options) {
  return this.http.get(this.url, options).toPromise().then(data => {
    _.extend(this, {data});
    this.publish();
    return this;
  });  
}
