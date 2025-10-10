import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDialogComponentComponent } from './checkout-dialog-component.component';

describe('CheckoutDialogComponentComponent', () => {
  let component: CheckoutDialogComponentComponent;
  let fixture: ComponentFixture<CheckoutDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
