import { Component, Input } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { ITrainings } from '../../service/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { TruncateStringPipe } from '../../pipes/truncate-string.pipe';
import { MatDialog } from '@angular/material/dialog';
import { TrainingPopupComponent } from '../../../components/trainings/training-popup/training-popup.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-card-with-title-content-button',
  standalone: true,
  imports: [CommonModule,TruncateStringPipe,MatInputModule,MatFormFieldModule,TrainingPopupComponent],
  templateUrl: './card-with-title-content-button.component.html',
  styleUrl: './card-with-title-content-button.component.scss'
})
export class CardWithTitleContentButtonComponent {
 @Input() upCommingTrainings: ITrainings[] = [];
 public modalOpen: boolean = false;
 public dialogRef!: MatDialog;

  constructor(private commonService:CommonService,public dialog: MatDialog) {
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }
  
  trackByIndex(index: number, item: any): number {
    return index;
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(TrainingPopupComponent, {
          width: '650px',
          height:'450px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'training registration-modal'
        })
        .afterClosed()
        .subscribe((result: any) => {
          // console.log('The dialog was closed');
          if (result) {
            // console.log('Form data:', result);
            // this.generateRandomNumbers();
            // this.saveinnvations(result);
          }
        });
    }
    this.modalOpen = true;
  }
}
