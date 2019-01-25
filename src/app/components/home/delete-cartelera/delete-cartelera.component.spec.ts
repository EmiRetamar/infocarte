import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarteleraComponent } from './delete-cartelera.component';

describe('DeleteCarteleraComponent', () => {
  let component: DeleteCarteleraComponent;
  let fixture: ComponentFixture<DeleteCarteleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCarteleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCarteleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
