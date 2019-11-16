import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

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
  isLoading = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.fb.group({
      name: [''],
      type: ['ALL'],
    });

    this.filterForm.valueChanges.pipe(
      tap(() => this.isLoading = true),
      debounceTime(1500),
      tap(() => this.isLoading = false),
      distinctUntilChanged((prev, curr) => prev.name === curr.name && prev.type === curr.type),
    )
      .subscribe(
        (filter: SearchModel) => this.searchValue.emit(filter));
  }

}
