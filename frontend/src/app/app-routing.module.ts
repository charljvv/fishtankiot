import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorComponent } from './sensor/sensor.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/sensor',
    pathMatch: 'full'
  },
  {
    path: 'sensor',
    component: SensorComponent
  },
  {
    path: 'sensor_list',
    component: SensorListComponent
  },
  {
    path: '**',
    redirectTo: '/sensor'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
