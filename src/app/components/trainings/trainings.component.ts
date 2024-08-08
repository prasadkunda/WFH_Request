import { Component, OnInit } from '@angular/core';
import { CommingsoonComponent } from '../../shared/components/commingsoon/commingsoon.component';
import { AutoCompleteFilterComponent } from '../../shared/components/auto-complete-filter/auto-complete-filter.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonService } from '../../shared/service/common.service';
import { ITrainings } from '../../shared/service/interfaces/interfaces';
import { CardWithTitleContentButtonComponent } from '../../shared/components/card-with-title-content-button/card-with-title-content-button.component';
import { TrainingPopupComponent } from './training-popup/training-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [CommingsoonComponent,AutoCompleteFilterComponent,RouterOutlet,CardWithTitleContentButtonComponent,TrainingPopupComponent,MatDialogModule ],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss'
})
export class TrainingsComponent implements OnInit {
  upCommingTrainings!: ITrainings[];
  public modalOpen: boolean = false;
  public dialogRef!: MatDialog;

  constructor(private router:Router,private commonService:CommonService,public dialog: MatDialog) {}
  ngOnInit(): void {
    this.commonService.getUpCommingTrainingsDetails().subscribe(resp => {
      if(resp){
        this.upCommingTrainings = resp;
      }else {
        console.error('Unexpected response :', resp);
      }
    })
  }

  navigateviewall(trainingId: any) {
    this.router.navigate(['viewall-trainings', trainingId]);
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(TrainingPopupComponent, {
          width: '650px',
          height:'450px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'Innovation Request-modal',
          hasBackdrop: true,
        })
        // .afterClosed()
        // .subscribe((result: any) => {
        //   // console.log('The dialog was closed');
        //   if (result) {
        //     // console.log('Form data:', result);
        //     this.generateRandomNumbers();
        //     this.saveinnvations(result);
        //   }
        // });
    }
    this.modalOpen = true;
  }
}
