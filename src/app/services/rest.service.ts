import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private httpClient: HttpClient
  ) {}

  getSensorDataByType(sensortype, count) {
    return this.httpClient.get('https://piebrain.net/api/sensorData/name/' + sensortype, {
      headers: {
        limit: count
      }
    });
  }

  changeLight(value) {
    return this.httpClient.post('https://piebrain.net/api/leds',
      {
        ledId: 1,
        ledValue: value
      }).toPromise().then(res => {
      console.log(res);
    });
  }

}
