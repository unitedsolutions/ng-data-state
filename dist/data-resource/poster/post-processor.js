import urlProcessor from '../_lib/url-processor';
export default function (params) {
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
}
//# sourceMappingURL=post-processor.js.map