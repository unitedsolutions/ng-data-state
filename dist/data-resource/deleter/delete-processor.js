import * as _ from 'lodash';
export default function (options) {
    var _this = this;
    var _id = options.params._id;
    var index = _.findIndex(this.data, { _id: _id });
    var record = this.data.splice(index, 1)[0];
    this.pendingDeleteId = _id;
    this.publish();
    var promise = this.http.delete(this.url, options).toPromise();
    promise.catch(function () {
        _this.data.splice(index, 0, record);
        _this.publish();
    });
    return promise;
}
//# sourceMappingURL=delete-processor.js.map