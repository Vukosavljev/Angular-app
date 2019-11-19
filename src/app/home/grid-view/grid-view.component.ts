import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material';

import { SensorObserverService } from './../../services/sensor-observer.service';
import { SensorModel } from './../../models/sensor.model';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
    displayedColumns = ['id', 'name', 'lastUpdate', 'action'];
    paginationSize = [5, 10, 20];
    dataSource: MatTableDataSource<SensorModel>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private sensorObserverService: SensorObserverService) {}

    ngOnInit() {
        this.sensorObserverService.allSendors$.subscribe(
            (sensors: SensorModel[]) => {
                if (Array.isArray(sensors)) {
                    this.dataSource = new MatTableDataSource(sensors);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                }
            }
        );
    }
}
