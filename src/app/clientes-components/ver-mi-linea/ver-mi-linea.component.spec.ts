import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMiLineaComponent } from './ver-mi-linea.component';

describe('VerMiLineaComponent', () => {
  let component: VerMiLineaComponent;
  let fixture: ComponentFixture<VerMiLineaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMiLineaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMiLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
