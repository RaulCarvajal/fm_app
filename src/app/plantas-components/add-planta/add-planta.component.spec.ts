import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantaComponent } from './add-planta.component';

describe('AddPlantaComponent', () => {
  let component: AddPlantaComponent;
  let fixture: ComponentFixture<AddPlantaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlantaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
