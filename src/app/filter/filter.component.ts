import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchModel } from './../models/search.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() searchValue = new EventEmitter<SearchModel>();

  sensorTypes = ['ALL', 'ACTUATOR', 'ALARM', 'FEED'];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      name: [''],
      type: ['ALL'],
    });

    this.filterForm.valueChanges.pipe(
      debounceTime(1500),
      distinctUntilChanged((prev, curr) => prev.name === curr.name && prev.type === curr.type)
    )
      .subscribe(
        (filter: SearchModel) => this.searchValue.emit(filter));
  }

}
