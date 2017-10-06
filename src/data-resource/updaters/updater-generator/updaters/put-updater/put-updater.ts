import * as _ from 'lodash';

export default function(data) {
  let {_id} = data;
  let recordIndex = _.findIndex(this.data, {_id});
  let clonedRecord = _.cloneDeep(this.data[recordIndex]);
  this.data.splice(recordIndex, 1, data);
  this.pendingUpdateId = _id;
  this.publish();
  
  return clonedRecord;
}
