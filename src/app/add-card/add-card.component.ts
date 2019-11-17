import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import { SensorObserverService } from '../services/sensor-observer.service';
import { SensorModel } from './../models/sensor.model';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();

    headerTitle = 'Add new sensor';
    buttonTitle = 'Save sensor';
    constructor(
        private sensorsService: SensorsService,
        private sensorobserverService: SensorObserverService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    onSubmit(formValue) {
        this.subscriptions = this.sensorsService
            .addSensor({
                ...formValue,
                lastUpdate: new Date().getTime()
            })
            .subscribe(
                (newSensor: SensorModel) => {
                    this.snackBar.open(
                        `You successfully added ${newSensor.name} sensor.`
                    );
                    this.sensorobserverService.addSensor(newSensor);
                    this.router.navigate(['home']);
                },
                error => {
                    this.snackBar.open(
                        'Your sensor has not been added, please try again later.'
                    );
                    console.log(error);
                }
            );
    }
}
