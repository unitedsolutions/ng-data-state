import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClientPlus } from 'ng-http-client-plus';
import { DataResource } from './data-resource/data-resource';
var DataState = (function () {
    function DataState(http) {
        this.http = http;
        this.dataResources = {};
    }
    DataState.prototype.createResource = function (configs) {
        var name = configs.name;
        var dataResources = this.dataResources;
        var resource = this.getResource(name);
        if (resource) {
            return resource;
        }
        _.extend(configs, { http: this.http });
        resource = new DataResource(configs);
        dataResources[name] = resource;
        return resource.fetch();
    };
    DataState.prototype.getResource = function (name) {
        return this.dataResources[name];
    };
    DataState.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DataState.ctorParameters = function () { return [
        { type: HttpClientPlus, },
    ]; };
    return DataState;
}());
export { DataState };
//# sourceMappingURL=ng-data-state.service.js.map