import { Component, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';

import { SensorsService } from './../../../services/sensors.service';
import { SensorModel } from './../../../models/sensor.model';
import * as SensorActions from './../../../store/sensor.actions';

@Component({
    selector: 'app-edit-form-wrapper',
    templateUrl: './edit-form-wrapper.component.html',
    styleUrls: ['./edit-form-wrapper.component.scss']
})
export class EditFormWrapperComponent implements OnDestroy {
    private subs = new Subscription();
    constructor(
        public dialog: MatDialogRef<EditFormWrapperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SensorModel,
        private sensorsService: SensorsService,
        private snackBar: MatSnackBar,
        private store: Store<{ sensorList: { sensors: SensorModel[] } }>
    ) {}

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onEdit(formValue: SensorModel) {
        this.subs.add(
            this.sensorsService.updateSensor(formValue).subscribe(
                (response: SensorModel) => {
                    this.snackBar.open(
                        `You successfully updated sensor ${response.name}.`
                    );
                    this.store.dispatch(
                        new SensorActions.UpdateSensor(response)
                    );
                    this.dialog.close();
                },
                erorr =>
                    this.snackBar.open(
                        'Sensor has not been updated, please try again.'
                    )
            )
        );
    }
}
