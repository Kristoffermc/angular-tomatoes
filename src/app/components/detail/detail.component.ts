import {Component, OnInit} from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import {RestService} from '../../services/rest.service';
import {Router} from '@angular/router';
import {SocketService} from '../../services/socket.service';

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

  currentTemperature: string;
  currentHumidity: string;
  currentSoil: string;
  currentLight: string;

  selectedSensor = 'temperature';
  sensors = [
    { value: 'temperature'},
    { value: 'humidity' },
    { value: 'soil' },
    { value: 'light' }
  ];

  configValue: number;

  updateValue = '50';
  updates = [
    {value: '25'},
    {value: '50'},
    {value: '100'},
    {value: '200'},
    {value: '500'},
    {value: '1000'}
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


    this.getSensorData(null);
    this.setLiveUpdate();
  }

  ngOnInit() {
  }

  setLiveUpdate() {
    this.socket.getSocketSensorPackageUpdates(this.selectedValue).subscribe(data => {
      const mapped: any = data;
      if (mapped.name === this.selectedSensor) {
        this.getSensorData(null);
      }

      switch (mapped.name) {
        case 'temperature':
          this.currentTemperature = mapped.value;
          break;
        case 'humidity':
          this.currentHumidity = mapped.value;
          break;
        case 'soil':
          this.currentSoil = mapped.value;
          break;
        case 'light':
          this.currentLight = mapped.value;
          break;
        default:
          console.log('Something went wrong');
          break;
      }
    });
  }

  getSensorData(eventValue) {
    if (eventValue) {
      this.updateValue = '' + eventValue.value;
    } else {
      console.log('No eventValue');
    }

    console.log('GetSensorData ' + this.updateValue);
    this.rest.getSensorDataByID(this.selectedSensor, this.selectedValue, this.updateValue).toPromise().then(res => {
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

  updateInterval() {
    this.rest.updateDeviceConfig(this.selectedValue, this.configValue);
  }

  changeLight(value) {
    this.rest.changeLight(this.selectedValue, value);
  }

}
