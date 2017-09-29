import * as _ from 'lodash';

export default function(record) {
  let {pendingPostData} = this;

  if(!pendingPostData) {
    this.data.push(record);
    this.publish();
    return this.addPublisher.next(record);
  }

  let recordSansId = _.omit(record, '_id');
  
  delete pendingPostData._id;
  
  if(_.isEqual(pendingPostData, recordSansId)) {
    pendingPostData._id = record._id;
    this.publish();
    this.pendingPostData = null;
  }
}
