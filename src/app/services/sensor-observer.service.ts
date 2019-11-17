import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

import { SensorModel } from './../models/sensor.model';

@Injectable({ providedIn: 'root' })
export class SensorObserverService {
    private sensorSubject = new BehaviorSubject<
        SensorModel[] | HttpErrorResponse | {}
    >({});
    allSendors$ = this.sensorSubject.asObservable();

    fetchSensors(sensors: SensorModel[] | HttpErrorResponse): void {
        return this.sensorSubject.next(sensors);
    }

    private getSensorsArrayValue() {
        const currentSensors = this.sensorSubject.getValue();
        if (Array.isArray(currentSensors)) {
            return currentSensors;
        }
    }

    deleteSensor(id: number): void {
        const newSensors = this.getSensorsArrayValue().filter(
            (sensor: SensorModel) => sensor.id !== id
        );
        this.sensorSubject.next(newSensors);
    }

    addSensor(newSensor: SensorModel) {
        this.sensorSubject.next([...this.getSensorsArrayValue(), newSensor]);
    }

    updateSensor(updatedSensor: SensorModel) {
        const newSensors = this.getSensorsArrayValue().map(
            (sensor: SensorModel) =>
                sensor.id === updatedSensor.id ? updatedSensor : sensor
        );
        this.sensorSubject.next(newSensors);
    }
}
