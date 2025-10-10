import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPLanComponent } from './buy-plan.component';

describe('BuyPLanComponent', () => {
  let component: BuyPLanComponent;
  let fixture: ComponentFixture<BuyPLanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyPLanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyPLanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
