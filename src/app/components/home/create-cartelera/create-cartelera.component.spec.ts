import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCarteleraComponent } from './create-cartelera.component';

describe('CreateCarteleraComponent', () => {
  let component: CreateCarteleraComponent;
  let fixture: ComponentFixture<CreateCarteleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCarteleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCarteleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
