import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ITrainings } from '../../../shared/service/interfaces/interfaces';
import { CommonService } from '../../../shared/service/common.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableComponent } from '../../../shared/components/mat-table/mat-table/mat-table.component';
import { ActivatedRoute } from '@angular/router';

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
  training_title!: string;
constructor(private commonService:CommonService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let trainingId = params.get('id');
      trainingId === 'upcoming'? this.training_title = 'Up Comming Trainings': trainingId === 'opted' ? this.training_title = 'Opted Trainings' : 'Completed Trainings'
      this.commonService.getUpCommingTrainingsDetails().subscribe(resp => {
        if(resp){
          this.upCommingTrainings = resp.filter((x)=> x.status === trainingId);
          this.dataSource = new MatTableDataSource(this.upCommingTrainings);
        }else {
          console.error('Unexpected response :', resp);
        }
      })
      // Now you can use this.trainingId in your component
    });
   
  } 

  displayedColumns = [
    'title',
    'content',
    'trainer',
    'duration',
    'type_of_training'
  ];
}
