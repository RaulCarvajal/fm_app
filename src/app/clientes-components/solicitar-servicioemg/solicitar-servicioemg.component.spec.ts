import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarServicioemgComponent } from './solicitar-servicioemg.component';

describe('SolicitarServicioemgComponent', () => {
  let component: SolicitarServicioemgComponent;
  let fixture: ComponentFixture<SolicitarServicioemgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarServicioemgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarServicioemgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
