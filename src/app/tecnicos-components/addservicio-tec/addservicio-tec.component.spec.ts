import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicioTecComponent } from './addservicio-tec.component';

describe('AddservicioTecComponent', () => {
  let component: AddservicioTecComponent;
  let fixture: ComponentFixture<AddservicioTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicioTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicioTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
