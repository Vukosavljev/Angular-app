import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import { SensorModel } from './../models/sensor.model';
import { SearchModel } from './../models/search.model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnDestroy {
  private sensorsSub = new Subscription();
  sensors: SensorModel[] = [];
  allSensors: SensorModel[] = [];

  constructor(private sensorsService: SensorsService) { }

  ngOnInit() {
    this.sensorsSub = this.sensorsService.getSensors().subscribe(
      (sensorsResponse: SensorModel[]) => {
        this.allSensors = sensorsResponse;
        this.sensors = this.allSensors;
        console.log(this.sensors)
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.sensorsSub.unsubscribe();
  }

  onFilterSearch(search: SearchModel) {
    const { name, type } = search;
    const regex = new RegExp(name, 'i');

    this.sensors = this.allSensors.filter((sensor: SensorModel) => {
      if (!regex.test(sensor.name) || (type !== sensor.type && type !== 'ALL')) {
        return false;
      }

      return true;
    });
  }
}
