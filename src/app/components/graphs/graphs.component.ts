import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';
import * as FusionCharts from 'fusioncharts';
import {Router} from '@angular/router';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  dataSource: any;
  data: object;
  graphData;

  selectedValue = 1;
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
    this.dataSource = {
      data: null,
      caption: {
        text: 'Sensor'
      },
      subcaption: {
        text: 'Grocery'
      },
      yAxis: [
        {
          plot: {
            value: 'Value',
            type: 'line'
          },
          format: {
            prefix: '$'
          },
          title: 'Sale Value'
        }
      ]
    };

    this.getSensorData(10);

  }

  getSensorData(count) {
    this.rest.getSensorDataByID(this.selectedSensor, this.selectedValue, count).toPromise().then(res => {
      this.graphData = res;
    }).then(() => {
      const dataMap = [];
      this.graphData.data.forEach(d => {
        // const date = new Date(d.timestamp * 1000);
        // dataMap.push({label: date.toDateString(), value: parseFloat(d.value)});
        dataMap.push([d.timestamp, parseFloat(d.value)]);
      });
      console.log(dataMap);

      this.dataSource.caption.text = 'Sensor: ' + this.selectedValue;
      this.dataSource.subcaption.text = this.selectedSensor;

      const schema = [{
        name: 'Time',
        type: 'date',
        format: '%s'
      }, {
        name: this.selectedSensor,
        type: 'number'
      }];

      const fusionTable = new FusionCharts.DataStore().createDataTable(
        dataMap,
        schema
      ); // Instance of DataTable to be passed as data in dataSource
      this.dataSource.data = fusionTable;

      this.data = {
        chart: { },
        data: dataMap
      };
      console.log(this.selectedSensor);
    });
  }

  ngOnInit() {
  }

}
