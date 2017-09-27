import * as _ from 'lodash';
export default function (record) {
    var index = _.findIndex(this.data, { _id: record._id });
    this.data.splice(index, 1, record);
    this.dataChangePublisher.next(record);
    this.publish();
}
//# sourceMappingURL=update-reverter.js.map