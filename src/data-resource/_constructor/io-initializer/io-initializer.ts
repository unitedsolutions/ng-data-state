import io           from 'socket.io-client';
import postSyncer   from './post-syncer/post-syncer';
import deleteSyncer from './delete-syncer/delete-syncer';
import updateSyncer from './update-syncer/update-syncer';

export default function() {
  let socket = io(this.url);
  let _updateSyncer = updateSyncer.bind(this);

  socket.on('post', postSyncer.bind(this));
  socket.on('delete', deleteSyncer.bind(this));
  socket.on('put', _updateSyncer);
  socket.on('patch', _updateSyncer);
}
