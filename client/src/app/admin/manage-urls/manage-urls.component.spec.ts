import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUrlsComponent } from './manage-urls.component';

describe('ManageUrlsComponent', () => {
  let component: ManageUrlsComponent;
  let fixture: ComponentFixture<ManageUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageUrlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
