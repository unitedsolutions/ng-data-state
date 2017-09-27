var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash';
import DataResource from './_constructor/constructor';
import post from './poster/post-processor';
import onAdd from './poster/post-broadcaster';
import deleteProcessor from './deleter/delete-processor';
import onDelete from './deleter/delete-broadcaster';
import updaters from './updaters/updaters';
import onUpdate from './updaters/update-broadcaster';
import fetch from './fetcher/fetcher';
import onPublish from './publisher/publish-broadcaster';
import publish from './publisher/publisher';
_.extend(DataResource.prototype, __assign({ post: post }, updaters, { delete: deleteProcessor, fetch: fetch,
    publish: publish,
    onPublish: onPublish,
    onUpdate: onUpdate,
    onDelete: onDelete,
    onAdd: onAdd }));
export { DataResource };
//# sourceMappingURL=data-resource.js.map