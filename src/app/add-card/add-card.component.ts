import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import * as SensorActions from './../store/sensor.actions';
import { SensorsService } from './../services/sensors.service';
import { SensorModel } from './../models/sensor.model';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnDestroy {
    private subscriptions = new Subscription();

    headerTitle = 'Add new sensor';
    buttonTitle = 'Save sensor';
    constructor(
        private sensorsService: SensorsService,
        private store: Store<{ sensorList: { sensors: SensorModel[] } }>,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    onSubmit(formValue: SensorModel) {
        this.subscriptions = this.sensorsService.addSensor(formValue).subscribe(
            (newSensor: SensorModel) => {
                this.snackBar.open(
                    `You successfully added ${newSensor.name} sensor.`
                );
                this.store.dispatch(new SensorActions.AddSensor(newSensor));
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
