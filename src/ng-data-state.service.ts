import * as _           from 'lodash';
import {Injectable}     from '@angular/core';
import {HttpClientPlus} from 'ng-http-client-plus';
import {DataResource}   from './data-resource/data-resource';

@Injectable()
export class DataState {
  dataResources = {};
  
  constructor(private http: HttpClientPlus) {}
  
  createResource(configs) {
    let {name} = configs;
    let {dataResources} = this;
    let resource = this.getResource(name);
    
    if(resource) {
      return resource;
    }

    _.extend(configs, {http: this.http});
    resource = new DataResource(configs);
    dataResources[name] = resource;
    return resource.fetch();
  }
  
  getResource(name) {
    return this.dataResources[name];
  }
}
