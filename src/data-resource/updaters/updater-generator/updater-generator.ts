import * as _       from 'lodash';
import urlProcessor from '../../_lib/url-processor';
import updater      from './update-processor/update-processor';
import reverter     from './update-reverter/update-reverter';

export default function(method) {
  return function(params) {
    let {data, url} = params;
    let originalRecord = updater.call(this, data);
    url = urlProcessor.call(this, url);
    let promise = this.http[method](url, data).toPromise();
    promise.catch(() => reverter.call(this, originalRecord));
    return promise;    
  }  
}
