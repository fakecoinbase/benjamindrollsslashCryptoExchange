import { Injectable } from '@angular/core';
import * as Rx from "rxjs/Rx";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // socket = new WebSocket("wss://ws-sandbox.coinapi.io/v1/")
  constructor() {}

  private subject: Rx.Subject<any>;
  public ws: any;

  public connect(url: string): Rx.Subject<any> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected:" + url);
    }
    return this.subject;
  }

  private create(url: string): Rx.Subject<any> {
     this.ws = new WebSocket(url);

    const observable = Rx.Observable.create((obs: Rx.Observer<any>) => {
      this.ws.onmessage = obs.next.bind(obs);
      this.ws.onerror = obs.error.bind(obs);
      this.ws.onclose = obs.complete.bind(obs);
      return this.ws.close.bind(this.ws);
    }).share();

    const observer = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    }

    return Rx.Subject.create(observer, observable);
  }

  public close() {
    if (this.ws) {
      this.ws.close();
      this.subject = null;
    }
  }


}
