import { Component, OnInit, Input } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogueComponent } from 'src/app/shared/confirmation-dialogue/confirmation-dialogue.component';
import { SensorModel } from './../../models/sensor.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() sensor: SensorModel;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {}

    onDelete() {
        this.dialog.open(ConfirmationDialogueComponent, {
            width: '400px',
            data: this.sensor
        });
    }
}
