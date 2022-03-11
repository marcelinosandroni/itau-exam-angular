import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCreatePageComponent } from './business-create-page.component';

describe('BusinessCreatePageComponent', () => {
  let component: BusinessCreatePageComponent;
  let fixture: ComponentFixture<BusinessCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCreatePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
