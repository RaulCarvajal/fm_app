import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosemgComponent } from './serviciosemg.component';

describe('ServiciosemgComponent', () => {
  let component: ServiciosemgComponent;
  let fixture: ComponentFixture<ServiciosemgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosemgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosemgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
