import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttendanceDialogComponent } from './admin-attendance-dialog.component';

describe('AdminAttendanceDialogComponent', () => {
  let component: AdminAttendanceDialogComponent;
  let fixture: ComponentFixture<AdminAttendanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAttendanceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
