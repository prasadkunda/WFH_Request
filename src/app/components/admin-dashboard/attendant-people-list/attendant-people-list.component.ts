import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedUiDesignSystemModule } from '../../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';

@Component({
  selector: 'app-attendant-people-list',
  standalone: true,
  imports: [SharedUiDesignSystemModule],
  templateUrl: './attendant-people-list.component.html',
  styleUrl: './attendant-people-list.component.scss',
})
export class AttendantPeopleListComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AttendantPeopleListComponent>
  ) {}

  submitForm() {
    this.dialogRef.close('Submitted');
  }
}
