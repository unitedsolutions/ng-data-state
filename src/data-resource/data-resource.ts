import * as _          from 'lodash';
import DataResource    from './_constructor/constructor';
import post            from './poster/post-processor';
import onAdd           from './poster/post-broadcaster';
import deleteProcessor from './deleter/delete-processor';
import onDelete        from './deleter/delete-broadcaster';
import updaters        from './updaters/updaters';
import onUpdate        from './updaters/update-broadcaster';
import fetch           from './fetcher/fetcher';
import onPublish       from './publisher/publish-broadcaster';
import publish         from './publisher/publisher';

_.extend(DataResource.prototype, {
  post,
  ...updaters,
  delete: deleteProcessor,
  fetch,
  publish,
  onPublish,
  onUpdate,
  onDelete,
  onAdd
});

export {DataResource};
