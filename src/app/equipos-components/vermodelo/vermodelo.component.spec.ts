import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermodeloComponent } from './vermodelo.component';

describe('VermodeloComponent', () => {
  let component: VermodeloComponent;
  let fixture: ComponentFixture<VermodeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VermodeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermodeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
