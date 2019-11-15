import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import { SensorModel } from './../models/sensor.model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnDestroy {
  private sensorsSub = new Subscription();
  sensors: SensorModel[] = [];

  constructor(private sensorsService: SensorsService) { }

  ngOnInit() {
    this.sensorsSub = this.sensorsService.getSensors().subscribe(
      (sensorsResponse: SensorModel[]) => {
        this.sensors = sensorsResponse;
        console.log(this.sensors)
      });
  }

  ngOnDestroy() {
    this.sensorsSub.unsubscribe();
  }
}
