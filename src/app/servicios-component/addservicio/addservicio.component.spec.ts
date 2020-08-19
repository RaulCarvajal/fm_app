import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicioComponent } from './addservicio.component';

describe('AddservicioComponent', () => {
  let component: AddservicioComponent;
  let fixture: ComponentFixture<AddservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
