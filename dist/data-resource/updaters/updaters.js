import * as _ from 'lodash';
import updaterGenerator from './updater-generator/updater-generator';
export default _.reduce(['put', 'patch'], function (updaters, updateMethod) {
    return _.extend(updaters, (_a = {}, _a[updateMethod] = updaterGenerator(updateMethod), _a));
    var _a;
}, {});
//# sourceMappingURL=updaters.js.map