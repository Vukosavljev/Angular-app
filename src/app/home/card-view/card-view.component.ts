import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subscription } from 'rxjs';

import { SearchModel } from './../../models/search.model';
import { SensorModel } from './../../models/sensor.model';
import { Store } from '@ngrx/store';

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

    constructor(
        private store: Store<{ sensorList: { sensors: SensorModel[] } }>
    ) {}

    ngOnInit() {
        this.subs.add(
            this.store.select('sensorList').subscribe(({ sensors }) => {
                this.errorOccured = false;
                this.allSensors = sensors;
                this.sensors = sensors;
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
