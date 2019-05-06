import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorComponent } from './sensor/sensor.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';

const routes: Routes = [
  {
    path: 'sensor',
    component: SensorComponent
  },
  {
    path: 'sensor_list',
    component: SensorListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
