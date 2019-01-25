import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarteleraComponent } from './edit-cartelera.component';

describe('EditCarteleraComponent', () => {
  let component: EditCarteleraComponent;
  let fixture: ComponentFixture<EditCarteleraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarteleraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarteleraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
