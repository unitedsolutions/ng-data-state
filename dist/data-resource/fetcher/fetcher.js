import * as _ from 'lodash';
export default function (options) {
    var _this = this;
    return this.http.get(this.url, options).toPromise().then(function (data) {
        _.extend(_this, { data: data });
        _this.publish();
        return _this;
    });
}
//# sourceMappingURL=fetcher.js.map