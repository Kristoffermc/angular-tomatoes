import { Component } from '@angular/core';
import {RestService} from './services/rest.service';
import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-tomatoes';

  constructor(private rest: RestService, private socket: SocketService) {
    this.rest.changeLight(-1).toPromise().then(res => {
      console.log(res);
    });

    this.socket.getSocketSensor(1).subscribe(data => {
      const mapped: any = data;
      console.log(mapped.id, mapped.name, mapped.value, mapped.timestamp);
    });


    this.rest.getSensorDataByType('temperature', 20).toPromise().then(res => {
      console.log(res);
    });
  }
}
