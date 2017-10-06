(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('lodash'), require('ng-http-client-plus'), require('rxjs'), require('socket.io-client')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'lodash', 'ng-http-client-plus', 'rxjs', 'socket.io-client'], factory) :
	(factory((global.ngDataState = {}),global.ng.core,global._,global.ngHttpClientPlus,global.Rx,global.io));
}(this, (function (exports,core,_,ngHttpClientPlus,rxjs,io) { 'use strict';

io = io && io.hasOwnProperty('default') ? io['default'] : io;

var postSyncer = function (record) {
    var pendingPostData = this.pendingPostData;
    if (!pendingPostData) {
        this.data.push(record);
        this.publish();
        return this.addPublisher.next(record);
    }
    var recordSansId = _.omit(record, '_id');
    delete pendingPostData._id;
    if (_.isEqual(pendingPostData, recordSansId)) {
        pendingPostData._id = record._id;
        this.publish();
        this.pendingPostData = null;
    }
};

var deleteSyncer = function (_id) {
    if (this.pendingDeleteId === _id) {
        return this.pendingDeleteId = null;
    }
    var index = _.findIndex(this.data, { _id: _id });
    this.data.splice(index, 1);
    this.publish();
    this.deletePublisher.next(_id);
};

var updateSyncer = function (record) {
    var _id = record._id;
    if (this.pendingUpdateId === _id) {
        return this.pendingUpdateId = null;
    }
    var currentRecord = _.find(this.data, { _id: _id });
    _.extend(currentRecord, record);
    this.updatePublisher.next(currentRecord);
    this.publish();
};

var ioInitializer = function () {
    var socket = io(this.url);
    var _updateSyncer = updateSyncer.bind(this);
    socket.on('post', postSyncer.bind(this));
    socket.on('delete', deleteSyncer.bind(this));
    socket.on('put', _updateSyncer);
    socket.on('patch', _updateSyncer);
};

var default_1 = /** @class */ (function () {
    function default_1(configs) {
        this.data = [];
        this.dataPublisher = new rxjs.BehaviorSubject([]);
        this.updatePublisher = new rxjs.Subject();
        this.deletePublisher = new rxjs.Subject();
        this.addPublisher = new rxjs.Subject();
        var name = configs.name, url = configs.url, http = configs.http;
        if (!url) {
            url = http.configs.baseUrl;
        }
        url = (url || '') + '/' + name;
        _.extend(this, configs, { url: url });
        ioInitializer.call(this);
    }
    return default_1;
}());

var urlProcessor = function (url) {
    if (url) {
        if (!url.startsWith('/')) {
            url = this.url + '/' + url;
        }
    }
    else {
        url = this.url;
    }
    return url;
};

var post = function (params) {
    var _this = this;
    var data = params.data, url = params.url;
    var index = this.data.push(data) - 1;
    url = urlProcessor.call(this, url);
    this.pendingPostData = data;
    this.publish();
    var promise = this.http.post(this.url, data).toPromise();
    promise.catch(function () {
        _this.data.splice(index, 1);
        _this.publish();
    });
    return promise;
};

var onAdd = function () {
    return this.addPublisher.asObservable();
};

var deleteProcessor = function (params) {
    var _this = this;
    var url = params.url, data = params.data;
    var _id = data._id;
    var index = _.findIndex(this.data, { _id: _id });
    var record = this.data.splice(index, 1)[0];
    url = urlProcessor.call(this, url);
    this.pendingDeleteId = _id;
    this.publish();
    var promise = this.http.delete(url, { params: data }).toPromise();
    promise.catch(function () {
        _this.data.splice(index, 0, record);
        _this.publish();
    });
    return promise;
};

var onDelete = function () {
    return this.deletePublisher.asObservable();
};

var patch = function (data) {
    var _id = data._id;
    var record = _.find(this.data, { _id: _id });
    var clonedRecord = _.cloneDeep(record);
    _.extend(record, data);
    this.pendingUpdateId = _id;
    this.publish();
    return clonedRecord;
};

var put = function (data) {
    var _id = data._id;
    var recordIndex = _.findIndex(this.data, { _id: _id });
    var clonedRecord = _.cloneDeep(this.data[recordIndex]);
    this.data.splice(recordIndex, 1, data);
    this.pendingUpdateId = _id;
    this.publish();
    return clonedRecord;
};

var updaters$1 = {
    patch: patch,
    put: put
};

var reverter = function (record) {
    var index = _.findIndex(this.data, { _id: record._id });
    this.data.splice(index, 1, record);
    this.dataChangePublisher.next(record);
    this.publish();
};

var updaterGenerator = function (method) {
    return function (params) {
        var _this = this;
        var data = params.data, url = params.url;
        var originalRecord = updaters$1[method].call(this, data);
        url = urlProcessor.call(this, url);
        var promise = this.http[method](url, data).toPromise();
        promise.catch(function () { return reverter.call(_this, originalRecord); });
        return promise;
    };
};

var updaters = _.reduce(['put', 'patch'], function (updaters, updateMethod) {
    return _.extend(updaters, (_a = {}, _a[updateMethod] = updaterGenerator(updateMethod), _a));
    var _a;
}, {});

var onUpdate = function () {
    return this.updatePublisher.asObservable();
};

var fetch = function (options) {
    var _this = this;
    return this.http.get(this.url, options).toPromise().then(function (data) {
        _.extend(_this, { data: data });
        _this.publish();
        return _this;
    });
};

var onPublish = function () {
    return this.dataPublisher.asObservable();
};

var publish = function () {
    this.dataPublisher.next(this.data.slice());
};

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
_.extend(default_1.prototype, __assign({ post: post }, updaters, { delete: deleteProcessor, fetch: fetch,
    publish: publish,
    onPublish: onPublish,
    onUpdate: onUpdate,
    onDelete: onDelete,
    onAdd: onAdd }));

var DataState = /** @class */ (function () {
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
        resource = new default_1(configs);
        dataResources[name] = resource;
        return resource.fetch();
    };
    DataState.prototype.getResource = function (name) {
        return this.dataResources[name];
    };
    DataState.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    DataState.ctorParameters = function () { return [
        { type: ngHttpClientPlus.HttpClientPlus, },
    ]; };
    return DataState;
}());

var DataStateModule = /** @class */ (function () {
    function DataStateModule() {
    }
    DataStateModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [ngHttpClientPlus.HttpClientPlusModule],
                    providers: [DataState]
                },] },
    ];
    /** @nocollapse */
    DataStateModule.ctorParameters = function () { return []; };
    return DataStateModule;
}());

exports.DataStateModule = DataStateModule;
exports.DataState = DataState;

Object.defineProperty(exports, '__esModule', { value: true });

})));
