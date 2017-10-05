import { NgModule } from '@angular/core';
import { DataState } from './ng-data-state.service';
import { HttpClientPlusModule } from 'ng-http-client-plus';
var DataStateModule = /** @class */ (function () {
    function DataStateModule() {
    }
    DataStateModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientPlusModule],
                    providers: [DataState]
                },] },
    ];
    /** @nocollapse */
    DataStateModule.ctorParameters = function () { return []; };
    return DataStateModule;
}());
export { DataStateModule };
//# sourceMappingURL=ng-data-state.module.js.map