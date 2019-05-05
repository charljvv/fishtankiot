import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiModule } from "./api/api.module";
import { SensorComponent } from './sensor/sensor.component';

@NgModule({
  declarations: [AppComponent, SensorComponent],
  imports: [BrowserModule, AppRoutingModule, ApiModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
