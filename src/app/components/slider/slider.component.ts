import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  val = -1;

  selectedValue: string;

  ids = [
    { value: 1 },
    { value: 2 },
    { value: 3 }
  ];

  constructor(private rest: RestService) {
  }

  ngOnInit() {}

  changeLight(value) {
    this.rest.changeLight(this.selectedValue, value);
    console.log(this.selectedValue);
  }
}
