import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SensorModel } from './../models/sensor.model';

@Injectable({
    providedIn: 'root'
})
export class SensorsService {
    BASE_URL = 'http://localhost:3000';
    SENSORS_URL = this.BASE_URL + '/sensors';

    constructor(private http: HttpClient) {}

    getSensors(): Observable<SensorModel[]> {
        return this.http.get(this.SENSORS_URL) as Observable<SensorModel[]>;
    }

    addSensor(newSensor: SensorModel): Observable<SensorModel> {
        return this.http.post<SensorModel>(this.SENSORS_URL, newSensor);
    }

    updateSensor(sensor: SensorModel): Observable<SensorModel> {
        const url = this.SENSORS_URL + `/${sensor.id}`;
        return this.http.put<SensorModel>(url, sensor);
    }

    deleteSensor(id: number): Observable<SensorModel> {
        const url = this.SENSORS_URL + `/${id}`;
        return this.http.delete<SensorModel>(url);
    }
}
