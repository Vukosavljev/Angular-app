import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SensorsService } from './../services/sensors.service';
import { SensorModel } from '../models/sensor.model';
import SENSOR_TYPES from '../constants/sensor-types';
import SENSOR_IMAGES from '../constants/sensor-images';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {
    private subscriptions = new Subscription();
    addSensorForm: FormGroup;
    sensorTypes = SENSOR_TYPES;
    sensorImages = SENSOR_IMAGES;

    constructor(
        private fb: FormBuilder,
        private sensorsService: SensorsService,
        private snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit() {
        this.addSensorForm = this.fb.group({
            name: ['', Validators.required],
            path: ['', Validators.required],
            type: ['', Validators.required],
            image: ['', Validators.required],
            unitSymbol: [null],
            value: ['']
        });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    onSubmit() {
        this.subscriptions = this.sensorsService
            .addSensor({
                ...this.addSensorForm.value,
                lastUpdate: new Date().getTime()
            })
            .subscribe(
                (newSensor: SensorModel) => {
                    this.snackBar.open('You successfully added sensor.');
                    this.router.navigate(['card-view']);
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
