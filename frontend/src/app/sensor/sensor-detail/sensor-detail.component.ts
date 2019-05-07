import { SensorData } from './../../api/models/sensor-data';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sensor-detail',
  templateUrl: './sensor-detail.component.html',
  styleUrls: ['./sensor-detail.component.css']
})
export class SensorDetailComponent implements OnInit {

  @Input() sensordata: SensorData;
  @Input() inList: boolean;
  public fishdead = false;
  public phHigh = false;
  public phLow = false;
  public avgTempHigh = false;
  public avgTempLow = false;
  constructor() { }

  ngOnInit() {
  }

  public colorForTemp(tempValue) {
    if (tempValue > 29) {
      this.fishdead = true;
      this.avgTempHigh = true;
      return 'red';
    } else if (tempValue < 24) {
      this.fishdead = true;
      this.avgTempLow = true;
      return 'blue';
    } else {
      this.fishdead = false;
      return 'green';
    }
  }

  public colorForPh(phValue) {
    if (phValue > 8.5) {
      this.fishdead = true;
      this.phHigh = true;
      return 'red';
    } else if (phValue < 5) {
      this.fishdead = true;
      this.phLow = true;
      return 'blue';
    } else {
      this.fishdead = false;
      return 'green';
    }
  }

}
