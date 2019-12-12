import { Component } from '@angular/core';
import {RestService} from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-tomatoes';

  constructor(private rest: RestService) {
    this.rest.changeLight(-1).toPromise().then(res => {
      console.log(res);
    });

    this.rest.getSensorDataByType('temperature', 20).toPromise().then(res => {
      console.log(res);
    });
  }
}
