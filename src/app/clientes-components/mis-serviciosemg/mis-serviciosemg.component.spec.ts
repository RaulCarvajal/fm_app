import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisServiciosemgComponent } from './mis-serviciosemg.component';

describe('MisServiciosemgComponent', () => {
  let component: MisServiciosemgComponent;
  let fixture: ComponentFixture<MisServiciosemgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisServiciosemgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisServiciosemgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
