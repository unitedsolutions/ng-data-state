import { BehaviorSubject, Subject } from 'rxjs';
export default class  {
    url: any;
    data: never[];
    dataPublisher: BehaviorSubject<never[]>;
    updatePublisher: Subject<{}>;
    deletePublisher: Subject<{}>;
    addPublisher: Subject<{}>;
    constructor(configs: any);
}
