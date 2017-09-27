import updater from './update-processor/update-processor';
import reverter from './update-reverter/update-reverter';
export default function (method) {
    return function (data, options) {
        var _this = this;
        var originalRecord = updater.call(this, data);
        var promise = this.http[method](this.url, data, options).toPromise();
        promise.catch(function () { return reverter.call(_this, originalRecord); });
        return promise;
    };
}
//# sourceMappingURL=updater-generator.js.map