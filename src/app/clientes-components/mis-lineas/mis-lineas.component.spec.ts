import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisLineasComponent } from './mis-lineas.component';

describe('MisLineasComponent', () => {
  let component: MisLineasComponent;
  let fixture: ComponentFixture<MisLineasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisLineasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisLineasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
