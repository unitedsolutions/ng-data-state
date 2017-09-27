import {NgModule}             from '@angular/core';
import {DataState}            from './ng-data-state.service';
import {HttpClientPlusModule} from 'ng-http-client-plus';

@NgModule({
  imports: [HttpClientPlusModule],
  providers: [DataState]
}) 
export class DataStateModule {}
