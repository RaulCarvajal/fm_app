import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddemgComponent } from './addemg.component';

describe('AddemgComponent', () => {
  let component: AddemgComponent;
  let fixture: ComponentFixture<AddemgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddemgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddemgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
