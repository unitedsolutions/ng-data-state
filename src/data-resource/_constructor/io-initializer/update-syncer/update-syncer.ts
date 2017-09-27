import * as _ from 'lodash';

export default function(record) {
  let {_id} = record;
  
  if(this.pendingUpdateId === _id) {
    return this.pendingUpdateId = null;
  }
  
  let currentRecord = _.find(this.data, {_id});
  _.extend(currentRecord, record);
  this.updatePublisher.next(currentRecord);
  this.publish();
}
