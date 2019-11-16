export class SensorModel {
    id: number;
    name: string;
    image: string;
    path: string;
    unitSymbol: string | null;
    value: string | boolean | number;
    lastUpdate: number;
    type: string;
}
