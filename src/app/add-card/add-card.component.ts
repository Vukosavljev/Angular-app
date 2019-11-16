import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  addSensorForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addSensorForm = this.fb.group({
      name: ['', Validators.required],
      // name: ['', Validators.required],
    })
  }

}
