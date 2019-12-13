import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  data: object;
  graphData;

  selectedValue: number;
  ids = [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ];

  selectedSensor = 'temperature';
  sensors = [
    { value: 'temperature'},
    { value: 'humidity' },
    { value: 'soil' },
    { value: 'light' }
  ];


  constructor(private rest: RestService) {
    this.getSensorData(10);
  }

  getSensorData(count) {
    this.rest.getSensorDataByID(this.selectedSensor, this.selectedValue, count).toPromise().then(res => {
      this.graphData = res;
    }).then(() => {
      this.data = {
        chart: { },
        data: this.graphData.data
      };
      console.log(this.selectedSensor);
    });
  }


  ngOnInit() {
  }

}
