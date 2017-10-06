import * as _ from 'lodash';

export default function(record) {
  let {_id} = record;
  
  if(this.pendingDeleteId === _id) {
    return this.pendingDeleteId = null;
  }
  
  let index = _.findIndex(this.data, {_id});
  this.data.splice(index, 1);
  this.publish();
  this.deletePublisher.next(_id);
}
