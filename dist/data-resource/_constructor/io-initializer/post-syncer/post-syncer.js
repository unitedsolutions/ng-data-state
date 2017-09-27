import * as _ from 'lodash';
export default function (record) {
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
}
//# sourceMappingURL=post-syncer.js.map