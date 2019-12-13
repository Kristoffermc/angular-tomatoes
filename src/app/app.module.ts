import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SliderComponent } from './components/slider/slider.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import {FusionChartsModule} from 'angular-fusioncharts';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';
import {OverviewComponent} from './components/overview/overview.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';
// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import { LoginComponent } from './components/login/login.component';
import { DetailComponent } from './components/detail/detail.component';

// Use fcRoot function to inject FusionCharts library, and the modules you want to use
FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries);


const socketConfig: SocketIoConfig = { url: 'http://piebrain.net:3002', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    GraphsComponent,
    OverviewComponent,
    LoginComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FusionChartsModule,
    SocketIoModule.forRoot(socketConfig),
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    RouterModule.forRoot([
      { path: 'overview', component: OverviewComponent },
      { path: 'info', component: DetailComponent },
      { path: '', component: LoginComponent }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
