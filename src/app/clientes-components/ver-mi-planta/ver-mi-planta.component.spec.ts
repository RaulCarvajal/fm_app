import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiPlantaComponent } from './ver-mi-planta.component';

describe('VerMiPlantaComponent', () => {
  let component: VerMiPlantaComponent;
  let fixture: ComponentFixture<VerMiPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMiPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
