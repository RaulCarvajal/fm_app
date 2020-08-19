import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlineComponent } from './viewline.component';

describe('ViewlineComponent', () => {
  let component: ViewlineComponent;
  let fixture: ComponentFixture<ViewlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
