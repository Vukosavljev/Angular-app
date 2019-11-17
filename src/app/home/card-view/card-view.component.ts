import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { SensorObserverService } from './../../services/sensor-observer.service';
import { SearchModel } from './../../models/search.model';
import { SensorModel } from './../../models/sensor.model';

@Component({
    selector: 'app-card-view',
    templateUrl: './card-view.component.html',
    styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit, OnDestroy {
    subs = new Subscription();
    sensors: SensorModel[] = [];
    allSensors: SensorModel[] = [];
    errorOccured = false;

    constructor(private sensorObserverService: SensorObserverService) {}

    ngOnInit() {
        this.subs.add(
            this.sensorObserverService.allSendors$.subscribe(sensorsState => {
                if (sensorsState instanceof HttpErrorResponse) {
                    this.errorOccured = true;
                    return;
                }

                if (Array.isArray(sensorsState)) {
                    this.errorOccured = false;
                    this.allSensors = sensorsState;
                    this.sensors = sensorsState;
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    onFilterSearch(search: SearchModel) {
        const { name, type } = search;
        const regex = new RegExp(name, 'i');

        this.sensors = this.allSensors.filter((sensor: SensorModel) => {
            if (
                !regex.test(sensor.name) ||
                (type !== sensor.type && type !== 'ALL')
            ) {
                return false;
            }

            return true;
        });
    }
}
