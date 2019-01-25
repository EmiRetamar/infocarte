import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteleraComponent } from './cartelera.component';

describe('CarteleraComponent', () => {
  let component: CarteleraComponent;
  let fixture: ComponentFixture<CarteleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
