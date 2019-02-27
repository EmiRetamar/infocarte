import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelerasSeguidasComponent } from './carteleras-seguidas.component';

describe('CartelerasSeguidasComponent', () => {
  let component: CartelerasSeguidasComponent;
  let fixture: ComponentFixture<CartelerasSeguidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartelerasSeguidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartelerasSeguidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
