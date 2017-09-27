import * as _ from 'lodash';
export default function (record) {
    var _id = record._id;
    if (this.pendingUpdateId === _id) {
        return this.pendingUpdateId = null;
    }
    var currentRecord = _.find(this.data, { _id: _id });
    _.extend(currentRecord, record);
    this.updatePublisher.next(currentRecord);
    this.publish();
}
//# sourceMappingURL=update-syncer.js.map