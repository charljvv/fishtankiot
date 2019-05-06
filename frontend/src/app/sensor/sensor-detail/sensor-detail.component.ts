import { SensorData } from './../../api/models/sensor-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {

  @Input() sensordata: SensorData;
  constructor() { }

  ngOnInit() {
  }

}
