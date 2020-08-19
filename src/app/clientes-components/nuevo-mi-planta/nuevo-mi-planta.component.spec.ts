import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMiPlantaComponent } from './nuevo-mi-planta.component';

describe('NuevoMiPlantaComponent', () => {
  let component: NuevoMiPlantaComponent;
  let fixture: ComponentFixture<NuevoMiPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMiPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMiPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
