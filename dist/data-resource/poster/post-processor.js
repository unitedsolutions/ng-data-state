export default function (data, options) {
    var _this = this;
    this.pendingPostData = data;
    var index = this.data.push(data) - 1;
    this.publish();
    var promise = this.http.post(this.url, data, options).toPromise();
    promise.catch(function () {
        _this.data.splice(index, 1);
        _this.publish();
    });
    return promise;
}
//# sourceMappingURL=post-processor.js.map