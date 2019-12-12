import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  data: object;
  graphData: any;

  constructor(private rest: RestService) {
   this.rest.getSensorDataByType('temperature', 10).toPromise().then(res => {
     this.graphData = res;
   }).then(() => {
     this.data = {
       chart: { },
       data: this.graphData.data
     };
   });

  }

  ngOnInit() {
  }

}
