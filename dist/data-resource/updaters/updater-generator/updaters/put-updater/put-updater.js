import * as _ from 'lodash';
export default function (data) {
    var _id = data._id;
    var recordIndex = _.findIndex(this.data, { _id: _id });
    var clonedRecord = _.cloneDeep(this.data[recordIndex]);
    this.data.splice(recordIndex, 1, data);
    this.pendingUpdateId = _id;
    this.publish();
    return clonedRecord;
}
//# sourceMappingURL=put-updater.js.map