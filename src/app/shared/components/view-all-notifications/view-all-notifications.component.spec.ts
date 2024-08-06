import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllNotificationsComponent } from './view-all-notifications.component';

describe('ViewAllNotificationsComponent', () => {
  let component: ViewAllNotificationsComponent;
  let fixture: ComponentFixture<ViewAllNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
