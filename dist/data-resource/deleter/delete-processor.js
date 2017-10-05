import * as _ from 'lodash';
import urlProcessor from '../_lib/url-processor';
export default function (params) {
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
}
//# sourceMappingURL=delete-processor.js.map