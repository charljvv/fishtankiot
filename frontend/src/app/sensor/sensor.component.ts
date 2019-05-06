import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/services';
import { SensorData } from '../api/models';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  public sensordata: SensorData;
  constructor(apiService: ApiService) {
    apiService.getApiSensorsLatestResponse().subscribe(response => {
      // this.sensordata = response.body;
      // console.log(this.sensordata);
      this.sensordata = {
        PhSensor1: { stringValue: '6', dataType: 'number' },
        TempSensor2: { stringValue: '20', dataType: 'number' },
        Timestamp: { stringValue: '20', dataType: 'string' },
        TempSensor1: { stringValue: '30', dataType: 'number' },
      };
    });
  }

  ngOnInit() { }
}
