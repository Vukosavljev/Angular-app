import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import { SensorObserverService } from '../services/sensor-observer.service';
import { SensorModel } from './../models/sensor.model';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    allSensors: SensorModel[];

    constructor(
        private sensorObserverService: SensorObserverService,
        private sensorsService: SensorsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.subs.add(
            this.sensorObserverService.allSendors$.subscribe(
                (response: SensorModel[]) => (this.allSensors = response)
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onSubmit(formValue) {
        const newSensor = {
            ...formValue,
            lastUpdated: new Date().getTime()
        };

        this.subs.add(
            this.sensorsService.updateSensor(newSensor).subscribe(
                (response: SensorModel) => {
                    console.log(response);
                    this.snackBar.open(
                        `You successfully updated sensor ${response.name}.`
                    );
                    this.sensorObserverService.updateSensor(response);
                },
                erorr =>
                    this.snackBar.open(
                        'Sensor has not been updated, please try again.'
                    )
            )
        );
    }
}
