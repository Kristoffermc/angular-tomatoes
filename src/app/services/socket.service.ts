import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  getSocketSensorPackageUpdates(sensorId) {
    return this.socket
      .fromEvent('sensordata/' + sensorId);
  }

}
