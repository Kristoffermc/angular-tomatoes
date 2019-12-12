import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor(private rest: RestService) {
    this.changeLight();
  }

  ngOnInit() {}

  changeLight() {
    console.log(this.rest.changeLight(100));
  }

}
