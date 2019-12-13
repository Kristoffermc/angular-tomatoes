import {Component, OnInit} from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {SocketService} from "../../services/socket.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  val: -1;
  dataSource: any;
  data: object;
  graphData;

  selectedValue = 1;

  selectedSensor = 'temperature';
  sensors = [
    { value: 'temperature'},
    { value: 'humidity' },
    { value: 'soil' },
    { value: 'light' }
  ];


  constructor(private rest: RestService,
              private router: Router,
              private socket: SocketService) {
    this.router.routerState.root.queryParams
      .subscribe(params => {
        this.selectedValue = params.paramID;
      });

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

    this.socket.getSocketSensorInSensorPackage(this.selectedValue, this.selectedSensor).subscribe(() => {
      this.getSensorData(10);
    });
  }

  ngOnInit() {
  }



  getSensorData(count) {
    this.rest.getSensorDataByID(this.selectedSensor, this.selectedValue, count).toPromise().then(res => {
      this.graphData = res;
    }).then(() => {
      const dataMap = [];
      this.graphData.data.forEach(d => {
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

  changeLight(value) {
    this.rest.changeLight(this.selectedValue, value);
    console.log(this.selectedValue);
  }

}
