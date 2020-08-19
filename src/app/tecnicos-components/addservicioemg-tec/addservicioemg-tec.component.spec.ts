import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicioemgTecComponent } from './addservicioemg-tec.component';

describe('AddservicioemgTecComponent', () => {
  let component: AddservicioemgTecComponent;
  let fixture: ComponentFixture<AddservicioemgTecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicioemgTecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicioemgTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
