import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SensorModel } from './../../models/sensor.model';
import { SensorsService } from './../../services/sensors.service';
import { SensorObserverService } from 'src/app/services/sensor-observer.service';

@Component({
    selector: 'app-confirmation-dialogue',
    templateUrl: './confirmation-dialogue.component.html',
    styleUrls: ['./confirmation-dialogue.component.scss']
})
export class ConfirmationDialogueComponent implements OnInit, OnDestroy {
    private subs = new Subscription();

    constructor(
        public dialog: MatDialogRef<ConfirmationDialogueComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SensorModel,
        private sensorService: SensorsService,
        private snackBar: MatSnackBar,
        private sensorObserverService: SensorObserverService
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onConfirm() {
        const id = this.data.id;
        this.subs = this.sensorService.deleteSensor(id).subscribe(
            () => {
                this.snackBar.open(`You successfully deleted sensor.`);
                this.sensorObserverService.deleteSensor(id);
                this.dialog.close();
            },
            () =>
                this.snackBar.open(
                    `Sensor has not been deleted, please try again.`
                )
        );
    }

    onCancel() {
        this.dialog.close();
    }
}
