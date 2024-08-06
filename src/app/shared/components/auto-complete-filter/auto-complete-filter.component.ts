import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-filter',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,ReactiveFormsModule,MatAutocompleteModule],
  templateUrl: './auto-complete-filter.component.html',
  styleUrl: './auto-complete-filter.component.scss'
})
export class AutoCompleteFilterComponent {
  myControl = new FormControl();
  options: string[] = ['Angular', 'React', 'JavaScript','.Net','Java','SQL','Mongo DB',
    'Python','Oracle','AWS','Dev Ops','Html','CSS','Typescript','Selenium','Manual testing',
  'Mobile Testing','Tosca','Docker'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
