import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemgComponent } from './viewemg.component';

describe('ViewemgComponent', () => {
  let component: ViewemgComponent;
  let fixture: ComponentFixture<ViewemgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewemgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewemgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
