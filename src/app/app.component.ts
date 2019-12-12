import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';
import {RestService} from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-tomatoes';

  constructor(private socket: SocketService) {
    this.socket.getSocketSensor(1).subscribe(data => {
      const mapped: any = data;
      console.log(mapped.id, mapped.name, mapped.value, mapped.timestamp);
    });
  }
}
