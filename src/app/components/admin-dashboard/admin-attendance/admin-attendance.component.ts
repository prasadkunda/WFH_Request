import { Component } from '@angular/core';
import { SharedUiDesignSystemModule } from '../../../shared/utils/shared-ui-design-system.module.ts/shared-ui-design-system/shared-ui-design-system.module';
import { MatDialog } from '@angular/material/dialog';
import { AdminAttendanceDialogComponent } from '../admin-attendance-dialog/admin-attendance-dialog.component';
import { title } from 'process';
import { CommonService } from '../../../shared/service/common.service';
import { AttendantPeopleListComponent } from '../attendant-people-list/attendant-people-list.component';

@Component({
  selector: 'app-admin-attendance',
  standalone: true,
  imports: [SharedUiDesignSystemModule],
  templateUrl: './admin-attendance.component.html',
  styleUrl: './admin-attendance.component.scss',
})
export class AdminAttendanceComponent {
  buttons: string[] = ['Angular', 'React', 'VueJS'];

  constructor(
    private matDialog: MatDialog,
    private commonService: CommonService
  ) {}

  openModal(course: string) {
    const dialogRef = this.matDialog.open(AdminAttendanceDialogComponent, {
      data: {
        title: course,
        users: [
          { name: 'Prasadu Kunda', emp_id: 'QE1906' },
          { name: 'Sai Madan sakinala', emp_id: 'QE1907' },
          { name: 'Suman Deekonda', emp_id: 'QE1908' },
        ],
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.commonService.openSnackBar(
          'Your request submitted successfully',
          'OK'
        );
      }
    });
  }

  openAttendanceModal(element:string){
    const dialogRef = this.matDialog.open(AttendantPeopleListComponent, {
      data: {
        title: element,
        users: [
          { name: 'Prasadu Kunda', emp_id: 'QE1906' },
          { name: 'Sai Madan sakinala', emp_id: 'QE1907' },
          { name: 'Suman Deekonda', emp_id: 'QE1908' },
        ],
      },
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.commonService.openSnackBar(
          'Your request submitted successfully',
          'OK'
        );
      }
    });
  }
}
