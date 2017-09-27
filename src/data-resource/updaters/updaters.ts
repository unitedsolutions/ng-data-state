import * as _           from 'lodash';
import updaterGenerator from './updater-generator/updater-generator';

export default _.reduce(['put', 'patch'], (updaters, updateMethod) => {
  return _.extend(updaters, {[updateMethod]: updaterGenerator(updateMethod)});
}, {});
