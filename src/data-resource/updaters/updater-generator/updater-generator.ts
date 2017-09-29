import * as _   from 'lodash';
import updater  from './update-processor/update-processor';
import reverter from './update-reverter/update-reverter';

export default function(method) {
  return function(data, options) {
    let originalRecord = updater.call(this, data);
    let promise = this.http[method](this.url, data, options).toPromise();
    promise.catch(() => reverter.call(this, originalRecord));
    return promise;    
  }  
}
