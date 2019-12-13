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

  id;
  constructor(private router: Router,
              private rest: RestService) {
    this.router.routerState.root.queryParams
      .subscribe(params => {
        this.id = params.id;
      });

    this.rest.getSensorPackages(this.id).then(res => {
      this.sensorPackages.push(res);
      this.sensors = this.sensorPackages[0].data;
    });
  }

  ngOnInit() {
  }

  navigateInfo() {
    this.router.navigate(['info']);
  }

}
