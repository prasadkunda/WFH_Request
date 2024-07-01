import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PopOverComponent } from '../../shared/components/pop-over/pop-over.component';
import { InnovationPopupComponent } from '../../shared/components/innovation-popup/innovation-popup.component';

@Component({
  selector: 'app-innovations',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './innovations.component.html',
  styleUrl: './innovations.component.scss',
})
export class InnovationsComponent {
  public dialogRef!: MatDialog;
  public modalOpen: boolean = false;
  constructor(public dialog: MatDialog) {
    this.dialogRef = dialog;
    this.dialogRef.afterAllClosed.subscribe(() => {
      this.modalOpen = false;
    });
  }

  public openDialog(): void {
    if (!this.modalOpen) {
      this.dialog
        .open(InnovationPopupComponent, {
          width: '648px',
          panelClass: 'custom_class',
          autoFocus: true,
          ariaLabel: 'WFH Request-modal',
          hasBackdrop: true,
        })
        .afterClosed()
        .subscribe((result: any) => {
          console.log('The dialog was closed');
          if (result) {
            console.log('Form data:', result);
            this.saveinnvations(result);
          }
        });
    }
    this.modalOpen = true;
  }
  public saveinnvations(value: any) {}
}
