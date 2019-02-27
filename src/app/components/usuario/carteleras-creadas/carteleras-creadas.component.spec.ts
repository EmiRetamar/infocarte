import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelerasCreadasComponent } from './carteleras-creadas.component';

describe('CartelerasCreadasComponent', () => {
  let component: CartelerasCreadasComponent;
  let fixture: ComponentFixture<CartelerasCreadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartelerasCreadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelerasCreadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
