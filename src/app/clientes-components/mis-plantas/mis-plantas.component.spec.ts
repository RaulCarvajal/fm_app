import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisPlantasComponent } from './mis-plantas.component';

describe('MisPlantasComponent', () => {
  let component: MisPlantasComponent;
  let fixture: ComponentFixture<MisPlantasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisPlantasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
