import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPlantaComponent } from './editar-planta.component';

describe('EditarPlantaComponent', () => {
  let component: EditarPlantaComponent;
  let fixture: ComponentFixture<EditarPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
