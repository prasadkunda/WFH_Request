import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedUiDesignSystemModule } from '../../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-admin-attendance-dialog',
  standalone: true,
  imports: [SharedUiDesignSystemModule],
  templateUrl: './admin-attendance-dialog.component.html',
  styleUrl: './admin-attendance-dialog.component.scss',
})
export class AdminAttendanceDialogComponent {
  selectedUser: Array<any> = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdminAttendanceDialogComponent>
) {}

  selectedUserList(item: MatSelectionListChange) {
    console.log('selected value',item.source.selectedOptions.selected);
    const values = item.source.selectedOptions.selected
    if(values.length > 0){
      this.selectedUser = [];
      values.forEach((element:any)=>{
        this.selectedUser.push(element.value);
      })
    }
  }
  submitForm() {
    console.log(this.selectedUser);
    this.dialogRef.close(this.selectedUser);
  }
}
