import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SensorsModel } from './../models/sensors.model';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {
  BASE_URL = 'http://localhost:3000';
  SENSORS_URL = this.BASE_URL + '/sensors';

  constructor(private http: HttpClient) { }

  getSensors(): Observable<SensorsModel[]> {
    return this.http.get(this.SENSORS_URL) as Observable<SensorsModel[]>;
  }
}
