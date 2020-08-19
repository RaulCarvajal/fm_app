import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcontratoComponent } from './editarcontrato.component';

describe('EditarcontratoComponent', () => {
  let component: EditarcontratoComponent;
  let fixture: ComponentFixture<EditarcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
