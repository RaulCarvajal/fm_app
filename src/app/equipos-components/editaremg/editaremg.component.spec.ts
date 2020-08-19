import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaremgComponent } from './editaremg.component';

describe('EditaremgComponent', () => {
  let component: EditaremgComponent;
  let fixture: ComponentFixture<EditaremgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaremgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaremgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
