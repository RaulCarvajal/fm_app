import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMiEquipoComponent } from './nuevo-mi-equipo.component';

describe('NuevoMiEquipoComponent', () => {
  let component: NuevoMiEquipoComponent;
  let fixture: ComponentFixture<NuevoMiEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMiEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMiEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
