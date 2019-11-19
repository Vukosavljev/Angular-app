import { SensorObserverService } from './../../services/sensor-observer.service';
import { SensorModel } from './../../models/sensor.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-grid-view',
    templateUrl: './grid-view.component.html',
    styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
    displayedColumns = ['id', 'name', 'lastUpdate', 'action'];
    dataSource: MatTableDataSource<SensorModel>;

    constructor(private sensorObserverService: SensorObserverService) {}

    ngOnInit() {
        this.sensorObserverService.allSendors$.subscribe(
            (sensors: SensorModel[]) => {
                this.dataSource = new MatTableDataSource(sensors);
            }
        );
    }
}
