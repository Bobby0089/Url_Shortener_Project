import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateShortUrlComponent } from './generate-short-url.component';

describe('GenerateShortUrlComponent', () => {
  let component: GenerateShortUrlComponent;
  let fixture: ComponentFixture<GenerateShortUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateShortUrlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateShortUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
