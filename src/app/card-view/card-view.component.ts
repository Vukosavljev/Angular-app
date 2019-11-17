import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { SensorDeleteService } from './sensor-delete-observer.service';
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
    errorOccured = false;

    constructor(
        private sensorsService: SensorsService,
        private sensorDeleteService: SensorDeleteService
    ) {}

    ngOnInit() {
        this.fetchSensors();

        this.sensorsSub.add(
            this.sensorDeleteService.deletedSendor$.subscribe(
                (id: number) =>
                    (this.sensors = this.sensors.filter(
                        (sensor: SensorModel) => sensor.id !== id
                    ))
            )
        );
    }

    fetchSensors() {
        this.sensorsSub.add(
            this.sensorsService.getSensors().subscribe(
                (sensorsResponse: SensorModel[]) => {
                    this.allSensors = sensorsResponse;
                    this.sensors = this.allSensors;
                    console.log(this.sensors);
                },
                () => (this.errorOccured = true)
            )
        );
    }

    ngOnDestroy() {
        this.sensorsSub.unsubscribe();
    }

    onFilterSearch(search: SearchModel) {
        const { name, type } = search;
        const regex = new RegExp(name, 'i');

        this.sensors = this.allSensors.filter((sensor: SensorModel) => {
            if (
                !regex.test(sensor.name) ||
                (type !== sensor.type && type !== 'ALL')
            ) {
                return false;
            }

            return true;
        });
    }
}
