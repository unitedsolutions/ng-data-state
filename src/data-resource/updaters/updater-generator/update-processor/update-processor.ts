import * as _ from 'lodash';

export default function(data) {
  let {_id} = data;
  let record = _.find(this.data, {_id});
  let clonedRecord = _.cloneDeep(record);
  _.extend(record, data);
  this.pendingUpdateId = _id;
  this.publish();
  
  return clonedRecord;
}
