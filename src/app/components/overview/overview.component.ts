import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  sensorPackages = [];
  sensors;
  constructor(private router: Router,
              private rest: RestService) {
    this.rest.getSensorPackages().then(res => {

      this.sensorPackages.push(res);
      this.sensors = this.sensorPackages[0].data;
      console.log(this.sensors);
    });
  }

  //      console.log(this.sensorPackages[0].data[0]);

  ngOnInit() {
  }

  navigateInfo() {
    this.router.navigate(['info']);
  }

}
