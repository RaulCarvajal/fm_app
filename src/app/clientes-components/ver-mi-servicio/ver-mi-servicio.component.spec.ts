import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiServicioComponent } from './ver-mi-servicio.component';

describe('VerMiServicioComponent', () => {
  let component: VerMiServicioComponent;
  let fixture: ComponentFixture<VerMiServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMiServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
