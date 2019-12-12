import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import {FusionChartsModule} from 'angular-fusioncharts';


// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts);


const socketConfig: SocketIoConfig = { url: 'http://piebrain.net:3002', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule,
    SocketIoModule.forRoot(socketConfig),
    BrowserAnimationsModule,
    MatSliderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
