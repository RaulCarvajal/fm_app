import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisServiciosTecComponent } from './mis-servicios-tec.component';

describe('MisServiciosTecComponent', () => {
  let component: MisServiciosTecComponent;
  let fixture: ComponentFixture<MisServiciosTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisServiciosTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisServiciosTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
