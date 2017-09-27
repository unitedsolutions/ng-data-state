import * as _                     from 'lodash';
import * as io                    from 'socket.io-client';
import {BehaviorSubject, Subject} from 'rxjs';
import ioInitializer              from './io-initializer/io-initializer';

export default class {
  url;
  data = [];
  dataPublisher = new BehaviorSubject([]);
  updatePublisher = new Subject();
  deletePublisher = new Subject();
  addPublisher = new Subject();
  
  constructor(configs) {
    let {name, url, http} = configs;
    
    if(!url) {
      url = http.configs.baseUrl;
    }
    
    url = (url || '') + '/' + name;
    _.extend(this, configs, {url});
    ioInitializer.call(this);
  }
}
