import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmodeloComponent } from './addmodelo.component';

describe('AddmodeloComponent', () => {
  let component: AddmodeloComponent;
  let fixture: ComponentFixture<AddmodeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmodeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmodeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
