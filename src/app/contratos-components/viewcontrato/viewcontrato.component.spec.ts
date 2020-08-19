import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcontratoComponent } from './viewcontrato.component';

describe('ViewcontratoComponent', () => {
  let component: ViewcontratoComponent;
  let fixture: ComponentFixture<ViewcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
