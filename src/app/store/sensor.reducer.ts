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
        default:
            return state;
    }
}
