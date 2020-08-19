import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiEquipoComponent } from './ver-mi-equipo.component';

describe('VerMiEquipoComponent', () => {
  let component: VerMiEquipoComponent;
  let fixture: ComponentFixture<VerMiEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMiEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
