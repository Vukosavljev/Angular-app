import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SensorModel } from './../../models/sensor.model';
import SENSOR_TYPES from '../../constants/sensor-types';
import SENSOR_IMAGES from '../../constants/sensor-images';

@Component({
    selector: 'app-card-form',
    templateUrl: './card-form.component.html',
    styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
    @Input() title: string;
    @Input() sensorData: SensorModel;
    @Input() buttonTitle: string;
    @Output() formValue = new EventEmitter();

    sensorForm: FormGroup;
    sensorTypes = SENSOR_TYPES;
    sensorImages = SENSOR_IMAGES;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.sensorForm = this.fb.group({
            name: [this.initValue('name'), Validators.required],
            path: [this.initValue('path'), Validators.required],
            type: [this.initValue('type'), Validators.required],
            image: [this.initValue('image'), Validators.required],
            unitSymbol: [this.initValue('unitSymbol')],
            value: [this.initValue('value')]
        });
    }

    initValue(key: string): string | boolean | null {
        return this.sensorData ? this.sensorData[key] : '';
    }

    onSubmit() {
        this.formValue.emit({
            ...this.sensorForm.value,
            id: this.initValue('id')
        });
    }
}
