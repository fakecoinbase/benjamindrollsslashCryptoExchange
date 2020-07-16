import { Component } from '@angular/core';
import {ExchangeService} from './exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private exchangeService: ExchangeService) {
    exchangeService.messages.subscribe(msg => {
      console.log("response from socket")
    })
  }

  private message = {
    type: "hello",
    apikey: "59FD3EB7-02E8-4E3E-A1D0-41800AC9CE89"
  }

  // sendMsg() {
  //   console.log("new message from client");
  //   this.exchangeService.messages.next(this.message);
  // }
}
