import { SensorModel } from './../models/sensor.model';
import * as SensorActions from './sensor.actions';

const initialState = {
    sensors: []
};

export function SensorReducer(
    state = initialState,
    action: SensorActions.SensorAction
) {
    switch (action.type) {
        case SensorActions.ADD_SENSOR:
            return {
                ...state,
                sensors: [...state.sensors, action.payload]
            };
        case SensorActions.FETCH_SENSOR:
            return {
                ...state,
                sensors: [...state.sensors, ...action.payload]
            };
        case SensorActions.UPDATE_SENSOR:
            return {
                ...state,
                sensors: [
                    ...state.sensors.map((sensor: SensorModel) =>
                        sensor.id === action.payload.id
                            ? action.payload
                            : sensor
                    )
                ]
            };
        case SensorActions.DELETE_SENSOR:
            return {
                ...state,
                sensors: [
                    ...state.sensors.filter(
                        (sensor: SensorModel) => sensor.id !== action.payload
                    )
                ]
            };
        default:
            return state;
    }
}
