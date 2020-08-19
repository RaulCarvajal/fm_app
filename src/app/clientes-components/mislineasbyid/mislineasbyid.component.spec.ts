import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MislineasbyidComponent } from './mislineasbyid.component';

describe('MislineasbyidComponent', () => {
  let component: MislineasbyidComponent;
  let fixture: ComponentFixture<MislineasbyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MislineasbyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MislineasbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
