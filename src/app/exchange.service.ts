import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ApiService} from "./api.service";

const exchangeURL = "wss://ws-sandbox.coinapi.io/v1/";

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  public messages: Subject<Message>
  constructor(wsService: ApiService) {
    this.messages = <Subject<Message>>wsService.connect(exchangeURL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    );
   }
}
