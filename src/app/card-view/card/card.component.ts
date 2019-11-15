import { Component, OnInit, Input } from '@angular/core';

import { SensorModel } from './../../models/sensor.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() sensor: SensorModel;
  constructor() { }

  ngOnInit() {
  }

}
