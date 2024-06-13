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
import { CommonService } from '../../shared/service/common.service';
import { Observable } from 'rxjs';
import { error } from 'console';

export interface UserData {
  sl_no : string;
  project:any;
  requested_date:string;
  approved_date:string;
  aprover:string;
  status:string;
  comments:string;  
}
export interface cardData{
  icon: string;
  title: string;
  number: number;
}
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatGridListModule,MatCardModule,MatIconModule,CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  cardDetails !: cardData[];
  users !: UserData[];

  displayedColumns: string[] = ['SL NO', 'Project', 'Requested date', 'Approved Date','Approver','Status','Comments'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private commonService:CommonService) {
    this.commonService.getAllRequest().subscribe(res => {
      if(res && Array.isArray(res)){
        this.users = res;
      }
    });
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }
  ngOnInit():void {
    this.getCardDetails();
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

  getCardDetails(){
    this.cardDetails = [];
    this.commonService.getCardsDetails().subscribe(res => 
      {
        try{
          if(res && Array.isArray(res)){
            this.cardDetails = res;
          }else{
            
          }
        }catch{
          console.error('Unexpected response :', res);
        }
        
      }
    )
  }

  // used to get title and index of the card
  onCardClick(index: number, title: string) {
    console.log('Card Index:', index);
    console.log('Card Title:', title);
    this.dataSource = new MatTableDataSource();
    let requestObservable;
    switch(title){
        case 'Approved' :
          requestObservable = this.commonService.getApprovedRequest();
          break;
          case 'Rejected' :
            requestObservable = this.commonService.getRejectedRequest();
            break;
            case 'New' :
            requestObservable = this.commonService.getNewRequest();
            break;
            default :
            requestObservable = this.commonService.getAllRequest();
            break;
    }
    this.handleRequest(requestObservable);
  }
  handleRequest(requestObservable: Observable<any>){
    requestObservable.subscribe(res => {
      try{
        if(res && Array.isArray(res)){
          this.dataSource = new MatTableDataSource(res);
        }
      }catch {
        console.error('Error in API Response',res)
      }
    })
  }
}


