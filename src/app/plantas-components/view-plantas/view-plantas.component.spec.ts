import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlantasComponent } from './view-plantas.component';

describe('ViewPlantasComponent', () => {
  let component: ViewPlantasComponent;
  let fixture: ComponentFixture<ViewPlantasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlantasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlantasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
