import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  val = -1;

  constructor(private rest: RestService) {
  }

  ngOnInit() {}

  changeLight(value) {
    this.rest.changeLight(value);
  }

}
