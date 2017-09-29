import * as _ from 'lodash';
export default function (_id) {
    if (this.pendingDeleteId === _id) {
        return this.pendingDeleteId = null;
    }
    var index = _.findIndex(this.data, { _id: _id });
    this.data.splice(index, 1);
    this.publish();
    this.deletePublisher.next(_id);
}
//# sourceMappingURL=delete-syncer.js.map