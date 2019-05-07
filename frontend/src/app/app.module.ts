import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiModule } from './api/api.module';
import { SensorComponent } from './sensor/sensor.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule,
  MatIconModule, MatTabsModule, MatCardModule, MatListModule, MatGridListModule
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorDetailComponent } from './sensor/sensor-detail/sensor-detail.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppComponent, SensorComponent, SensorListComponent, SensorDetailComponent],
  imports:
    [BrowserModule, AppRoutingModule, ApiModule, BrowserAnimationsModule, MatButtonModule,
      MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,
      MatTabsModule, MatCardModule, MatListModule, MatGridListModule, FlexLayoutModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
