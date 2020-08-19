import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarServicioComponent } from './iniciar-servicio.component';

describe('IniciarServicioComponent', () => {
  let component: IniciarServicioComponent;
  let fixture: ComponentFixture<IniciarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
