import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineasbyidComponent } from './lineasbyid.component';

describe('LineasbyidComponent', () => {
  let component: LineasbyidComponent;
  let fixture: ComponentFixture<LineasbyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineasbyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineasbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
