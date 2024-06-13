import { Component, ViewChild } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface UserData {
  sl_no : string;
  project:any;
  designation:string;
  dates:string;
  comments:string;
  status:string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatIconModule,CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  cards = [
    { icon: 'list_alt', title: 'Total Requests', number: 10 },
    { icon: 'check_circle_outline', title: 'Approved', number: 6 },
    { icon: 'highlight_off', title: 'Rejected', number: 3 },
    { icon: 'library_add', title: 'New', number: 1 }
  ]; 

  displayedColumns: string[] = ['SL NO', 'Project', 'Designation', 'Dates','Comments','Status'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor() {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    const users = [
      {sl_no:'1',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'2',project:'IMMIGRATION',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'3',project:'SWA',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'4',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'5',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'6',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'approved'},
      {sl_no:'1',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'rejected'},
      {sl_no:'2',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'rejected'},
      {sl_no:'3',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'rejected'},
      {sl_no:'1',project:'TAX',designation:'teammember',dates:'',comments:'Health issues',status:'created'},
      ]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };
// }
