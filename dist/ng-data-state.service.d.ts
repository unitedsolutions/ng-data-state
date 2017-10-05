import { HttpClientPlus } from 'ng-http-client-plus';
export declare class DataState {
    private http;
    dataResources: {};
    constructor(http: HttpClientPlus);
    createResource(configs: any): any;
    getResource(name: any): any;
}
