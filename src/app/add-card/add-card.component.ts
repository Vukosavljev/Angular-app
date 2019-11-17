import { SensorModel } from './../models/sensor.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SensorsService } from './../services/sensors.service';

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
                    this.snackBar.open('You successfully added sensor.');
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
