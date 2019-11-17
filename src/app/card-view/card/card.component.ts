import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SensorDeleteService } from './../sensor-delete-observer.service';
import { SensorsService } from './../../services/sensors.service';
import { SensorModel } from './../../models/sensor.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
    @Input() sensor: SensorModel;
    private subs = new Subscription();

    constructor(
        private sensorService: SensorsService,
        private sensorDeleteService: SensorDeleteService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {}

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onDelete() {
        this.subs = this.sensorService.deleteSensor(this.sensor).subscribe(
            () => {
                this.snackBar.open(`You successfully deleted sensor.`);
                this.sensorDeleteService.deleteSensorNotify(this.sensor.id);
            },
            () =>
                this.snackBar.open(
                    `Sensor has not been deleted, please try again.`
                )
        );
    }
}
