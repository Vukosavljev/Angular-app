import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {  SensorModel } from './../models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  BASE_URL = 'http://localhost:3000';
  SENSORS_URL = this.BASE_URL + '/sensors';

  constructor(private http: HttpClient) { }

  getSensors(): Observable<SensorModel[]> {
    return this.http.get(this.SENSORS_URL) as Observable<SensorModel[]>;
  }
}
