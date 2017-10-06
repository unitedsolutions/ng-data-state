import * as _ from 'lodash';
export default function (data) {
    var _id = data._id;
    var record = _.find(this.data, { _id: _id });
    var clonedRecord = _.cloneDeep(record);
    _.extend(record, data);
    this.pendingUpdateId = _id;
    this.publish();
    return clonedRecord;
}
//# sourceMappingURL=patch-updater.js.map