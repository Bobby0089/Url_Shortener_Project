import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackListUserComponent } from './black-list-user.component';

describe('BlackListUserComponent', () => {
  let component: BlackListUserComponent;
  let fixture: ComponentFixture<BlackListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlackListUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
