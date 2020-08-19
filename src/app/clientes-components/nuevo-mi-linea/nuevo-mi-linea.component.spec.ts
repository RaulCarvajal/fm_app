import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMiLineaComponent } from './nuevo-mi-linea.component';

describe('NuevoMiLineaComponent', () => {
  let component: NuevoMiLineaComponent;
  let fixture: ComponentFixture<NuevoMiLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMiLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMiLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
