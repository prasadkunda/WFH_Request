import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendantPeopleListComponent } from './attendant-people-list.component';

describe('AttendantPeopleListComponent', () => {
  let component: AttendantPeopleListComponent;
  let fixture: ComponentFixture<AttendantPeopleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendantPeopleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendantPeopleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
