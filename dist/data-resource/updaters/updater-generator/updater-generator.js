import urlProcessor from '../../_lib/url-processor';
import updaters from './updaters/updaters';
import reverter from './update-reverter/update-reverter';
export default function (method) {
    return function (params) {
        var _this = this;
        var data = params.data, url = params.url;
        var originalRecord = updaters[method].call(this, data);
        url = urlProcessor.call(this, url);
        var promise = this.http[method](url, data).toPromise();
        promise.catch(function () { return reverter.call(_this, originalRecord); });
        return promise;
    };
}
//# sourceMappingURL=updater-generator.js.map