import * as _ from 'lodash';

export default function(record) {
  let index = _.findIndex(this.data, {_id: record._id});
  this.data.splice(index, 1, record);
  this.updatePublisher.next(record);
  this.publish();
}
