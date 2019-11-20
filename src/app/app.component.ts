import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { SensorsService } from './services/sensors.service';
import { SensorObserverService } from './services/sensor-observer.service';
import { SensorModel } from './models/sensor.model';
import * as SensorActions from './store/sensor.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private sensorsSub = new Subscription();

    constructor(
        private sensorsService: SensorsService,
        private sensorObserverService: SensorObserverService,
        private store: Store<{ sensorList: { sensors: SensorModel[] } }>
    ) {}

    ngOnInit() {
        this.sensorsSub = this.sensorsService.getSensors().subscribe(
            (sensorsResponse: SensorModel[]) =>
                this.store.dispatch(
                    new SensorActions.FetchSensor(sensorsResponse)
                ),
            // this.sensorObserverService.fetchSensors(sensorsResponse),
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
