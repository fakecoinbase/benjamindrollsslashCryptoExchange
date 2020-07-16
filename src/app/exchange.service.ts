import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {ApiService} from "./api.service";
import {environment} from '../environments/environment'

export interface Message {
  type: string;
  apikey: string;
  subscribe_data_type: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  public messages: Subject<Message>
  constructor(wsService: ApiService) {
    this.messages = <Subject<Message>>wsService.connect(environment.exchangeURL).map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          type: data.type,
          apikey: data.apikey,
          subscribe_data_type: data.subscribe_data_type
        };
      }
    );
   }
}
