import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewservicioComponent } from './viewservicio.component';

describe('ViewservicioComponent', () => {
  let component: ViewservicioComponent;
  let fixture: ComponentFixture<ViewservicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewservicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewservicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
