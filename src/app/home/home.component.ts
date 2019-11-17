import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { SensorModel } from './../models/sensor.model';
import { SensorObserverService } from './../services/sensor-observer.service';
import { SensorsService } from './../services/sensors.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
    private sensorsSub = new Subscription();
    cardView = true;

    constructor(
        private sensorsService: SensorsService,
        private sensorObserverService: SensorObserverService
    ) {}

    ngOnInit() {
        this.sensorsSub = this.sensorsService.getSensors().subscribe(
            (sensorsResponse: SensorModel[]) =>
                this.sensorObserverService.fetchSensors(sensorsResponse),
            (error: HttpErrorResponse) => {
                this.sensorObserverService.fetchSensors(
                    error as HttpErrorResponse
                );
                console.log(error);
            }
        );
    }

    ngOnDestroy() {
        this.sensorsSub.unsubscribe();
    }
}
