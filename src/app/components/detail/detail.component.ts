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
    {value: '60', viewValue: '½ hour'},
    {value: '120', viewValue: '1 hour'},
    {value: '240', viewValue: '2 hours'},
    {value: '480', viewValue: '4 hours'},
    {value: '960', viewValue: '8 hours'},
    {value: '1440', viewValue: '12 hours'},
    {value: '2880', viewValue: '1 day'}
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

    const time = Math.floor((Date.now() / 1000) - 86400);

    this.rest.getSensorDataByID(this.selectedSensor, this.selectedValue, this.updateValue).toPromise().then(res => {
      this.graphData = res;
      console.log(this.graphData);
    }).then(() => {
      const dataMap = [];
      this.graphData.data.forEach(d => {
        dataMap.push([d.timestamp, parseFloat(d.value)]);
      });

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
    });
  }

  updateInterval() {
    this.rest.updateDeviceConfig(this.selectedValue, this.configValue);
  }

  changeLight(value) {
    this.rest.changeLight(this.selectedValue, value);
  }

}
