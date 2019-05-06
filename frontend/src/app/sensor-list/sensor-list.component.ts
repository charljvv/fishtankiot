import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api/services";
import { SensorData } from "../api/models";

@Component({
  selector: "app-sensor-list",
  templateUrl: "./sensor-list.component.html",
  styleUrls: ["./sensor-list.component.css"]
})
export class SensorListComponent implements OnInit {
  public sensorListData;
  constructor(apiService: ApiService) {
    apiService.getApiSensorsAll().subscribe(response => {
      var listData = [];
      response.forEach(message => {
        listData.push(message.messageAttributes);
      });

      this.sensorListData = listData;
      // this.sensorListData = [
      //   {
      //     PhSensor1: { stringValue: "7.5", dataType: "number" },
      //     TempSensor2: { stringValue: "20", dataType: "number" },
      //     Timestamp: { stringValue: "20", dataType: "string" },
      //     TempSensor1: { stringValue: "20", dataType: "number" }
      //   },
      //   {
      //     PhSensor1: { stringValue: "7.5", dataType: "number" },
      //     TempSensor2: { stringValue: "20", dataType: "number" },
      //     Timestamp: { stringValue: "20", dataType: "string" },
      //     TempSensor1: { stringValue: "20", dataType: "number" }
      //   }
      // ];
    });
  }

  ngOnInit() {}
}
