import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { SensorsService } from './../services/sensors.service';
import { SensorModel } from '../models/sensor.model';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    allSensors: SensorModel[];

    constructor(private sensorsService: SensorsService) {}

    ngOnInit() {
        this.subs = this.sensorsService
            .getSensors()
            .subscribe(
                (response: SensorModel[]) => (this.allSensors = response)
            );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
