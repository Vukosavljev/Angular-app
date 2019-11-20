import { Action } from '@ngrx/store';
import { SensorModel } from './../models/sensor.model';

export const ADD_SENSOR = 'ADD_SENSOR';
export const FETCH_SENSOR = 'FETCH_SENSOR';
export const DELETE_SENSOR = 'DELETE_SENSOR';
export const UPDATE_SENSOR = 'UPDATE_SENSOR';

export class AddSensor implements Action {
    readonly type = ADD_SENSOR;
    constructor(public payload: SensorModel) {}
}

export class FetchSensor implements Action {
    readonly type = FETCH_SENSOR;
    constructor(public payload: SensorModel[]) {}
}

export class DeleteSensor implements Action {
    readonly type = DELETE_SENSOR;
    constructor(public payload: number) {}
}

export class UpdateSensor implements Action {
    readonly type = UPDATE_SENSOR;
    constructor(public payload: SensorModel) {}
}

export type SensorAction =
    | AddSensor
    | FetchSensor
    | DeleteSensor
    | UpdateSensor;
