import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITrainings } from '../../../shared/service/interfaces/interfaces';
import { CommonService } from '../../../shared/service/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table/mat-table.component';

@Component({
  selector: 'app-viewall-trainings',
  standalone: true,
  imports: [MatCardModule,MatTableComponent],
  templateUrl: './viewall-trainings.component.html',
  styleUrl: './viewall-trainings.component.scss'
})
export class ViewallTrainingsComponent implements OnInit {

  dataSource!: MatTableDataSource<ITrainings>;
  upCommingTrainings!: ITrainings[];

constructor(private commonService:CommonService) {}

  ngOnInit(): void {
    this.commonService.getUpCommingTrainingsDetails().subscribe(resp => {
      if(resp){
        this.upCommingTrainings = resp;
        this.dataSource = new MatTableDataSource(this.upCommingTrainings);
      }else {
        console.error('Unexpected response :', resp);
      }
    })
  } 

  displayedColumns = [
    'title',
    'content',
    'trainer',
    'duration',
    'type_of_training'
  ];
}
