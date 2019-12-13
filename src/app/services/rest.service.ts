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

  getSensorDataByID(sensortype, sensorID, count) {
    return this.httpClient.post('https://piebrain.net/api/sensorData/query', {
      id: sensorID,
      name: sensortype
    },
      {
        headers: {
          limit: count
        }
      });
  }

  changeLight(id, value) {
    return this.httpClient.post('https://piebrain.net/api/leds',
      {
        ledId: id,
        ledValue: value
      }).toPromise().then(res => {
      console.log(res);
    });
  }

  getSensorPackages() {
    return this.httpClient.get('https://piebrain.net/api/sensorpackages/').toPromise();
  }

  getUser(userEmail, userPassword) {
    return this.httpClient.post('https://piebrain.net/api/users/query', {
      email: userEmail,
      password: userPassword
    });
  }

}
