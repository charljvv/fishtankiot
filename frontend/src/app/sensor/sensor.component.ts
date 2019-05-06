import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../api/services";
import { SensorData } from "../api/models";
import { Observable, timer } from 'rxjs';

@Component({
  selector: "app-sensor",
  templateUrl: "./sensor.component.html",
  styleUrls: ["./sensor.component.css"]
})
export class SensorComponent implements OnInit {
  public sensordata;

  // Uncomment this to live reload every 5 seconds, add implements 
  // private sensorSubscription;
  // private timerSubscription;
  
  constructor(private apiService: ApiService) {
    apiService.getApiSensorsLatestResponse().subscribe(response => {
      this.sensordata = response.body.messageAttributes;

      // Uncomment this to live reload every 5 seconds, add implements 
      //this.refreshData();
    });
  }
  ngOnInit() { }

  // Uncomment this to live reload every 5 seconds, add implements OnDestroy to class header
  /*
  private refreshData(): void {
    this.sensorSubscription = this.apiService.getApiSensorsLatestResponse().subscribe(response => {
      this.sensordata = response.body.messageAttributes;
      console.log(this.sensordata);
      this.subscribeToData();
    });
  }

  private subscribeToData(): void {
    this.timerSubscription = timer(5000).subscribe(() => this.refreshData());
  }

  public ngOnDestroy(): void {
    if (this.sensorSubscription) {
      this.sensorSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  */
}
