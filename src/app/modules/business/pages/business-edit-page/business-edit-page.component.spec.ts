import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEditPageComponent } from './business-edit-page.component';

describe('BusinessEditPageComponent', () => {
  let component: BusinessEditPageComponent;
  let fixture: ComponentFixture<BusinessEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
