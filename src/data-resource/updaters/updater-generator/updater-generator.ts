import * as _       from 'lodash';
import urlProcessor from '../../_lib/url-processor';
import updaters     from './updaters/updaters';
import reverter     from './update-reverter/update-reverter';

export default function(method) {
  return function(params) {
    let {data, url} = params;
    let originalRecord = updaters[method].call(this, data);
    url = urlProcessor.call(this, url);
    let promise = this.http[method](url, data).toPromise();
    promise.catch(() => reverter.call(this, originalRecord));
    return promise;    
  }  
}
