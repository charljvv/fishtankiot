import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SensorComponent } from "./sensor/sensor.component";

const routes: Routes = [
  {
    path: "sensor",
    component: SensorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
