import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import ioInitializer from './io-initializer/io-initializer';
var default_1 = /** @class */ (function () {
    function default_1(configs) {
        this.data = [];
        this.dataPublisher = new BehaviorSubject([]);
        this.updatePublisher = new Subject();
        this.deletePublisher = new Subject();
        this.addPublisher = new Subject();
        var name = configs.name, url = configs.url, http = configs.http;
        if (!url) {
            url = http.configs.baseUrl;
        }
        url = (url || '') + '/' + name;
        _.extend(this, configs, { url: url });
        ioInitializer.call(this);
    }
    return default_1;
}());
export default default_1;
//# sourceMappingURL=constructor.js.map