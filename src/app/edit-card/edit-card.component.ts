import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import * as SensorActions from './../store/sensor.actions';
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
        private store: Store<{ sensorList: { sensors: SensorModel[] } }>,
        private sensorsService: SensorsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.subs.add(
            this.store
                .select('sensorList')
                .subscribe(({ sensors }) => (this.allSensors = sensors))
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onSubmit(formValue: SensorModel) {
        this.subs.add(
            this.sensorsService.updateSensor(formValue).subscribe(
                (response: SensorModel) => {
                    this.snackBar.open(
                        `You successfully updated sensor ${response.name}.`
                    );
                    this.store.dispatch(
                        new SensorActions.UpdateSensor(response)
                    );
                },
                erorr =>
                    this.snackBar.open(
                        'Sensor has not been updated, please try again.'
                    )
            )
        );
    }
}
