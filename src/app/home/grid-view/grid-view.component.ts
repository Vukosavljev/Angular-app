import { SensorsService } from './../../services/sensors.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';
import { Subscription } from 'rxjs';

import { SensorObserverService } from './../../services/sensor-observer.service';
import { SensorModel } from './../../models/sensor.model';
import { SearchModel } from './../../models/search.model';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit, OnDestroy {
    private subs = new Subscription();
    errorOccured = false;
    /* TABLE DATA */
    displayedColumns = ['id', 'name', 'lastUpdate', 'action'];
    paginationSize = [5, 10, 20];
    dataSource: MatTableDataSource<SensorModel>;
    tableFilter: SearchModel = {
        name: '',
        type: ''
    };
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private sensorObserverService: SensorObserverService,
        private sensorService: SensorsService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.subs.add(
            this.sensorObserverService.allSendors$.subscribe(
                (sensors: SensorModel[]) => {
                    if (sensors instanceof HttpErrorResponse) {
                        this.errorOccured = true;
                        return;
                    }

                    if (Array.isArray(sensors)) {
                        this.dataSource = new MatTableDataSource(sensors);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.dataSource.filterPredicate = this.customFilter;
                    }
                }
            )
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    customFilter(data: SensorModel, value: string): boolean {
        const searchTerms = JSON.parse(value);
        return (
            data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !==
                -1 &&
            data.type.toLowerCase().indexOf(searchTerms.type.toLowerCase()) !==
                -1
        );
    }

    onSearch(searchValue: SearchModel) {
        this.tableFilter.type =
            searchValue.type === 'ALL' ? '' : searchValue.type;
        this.tableFilter.name = searchValue.name;

        this.dataSource.filter = JSON.stringify(this.tableFilter);
    }

    onDelete(id: number) {
        this.subs.add(
            this.sensorService
                .deleteSensor(id)
                .subscribe((deletedSensor: SensorModel) => {
                    this.sensorObserverService.deleteSensor(id);
                    this.snackBar.open(
                        `You successfully deleted sensor ${deletedSensor.name}.`
                    );
                })
        );
    }

    onEdit(element: SensorModel) {
        console.log(element);
    }
}
