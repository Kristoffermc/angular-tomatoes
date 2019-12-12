import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import {FusionChartsModule} from 'angular-fusioncharts';


// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts);


@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
