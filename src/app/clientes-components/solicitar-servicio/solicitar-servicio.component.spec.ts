import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicioComponent } from './solicitar-servicio.component';

describe('SolicitarServicioComponent', () => {
  let component: SolicitarServicioComponent;
  let fixture: ComponentFixture<SolicitarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
