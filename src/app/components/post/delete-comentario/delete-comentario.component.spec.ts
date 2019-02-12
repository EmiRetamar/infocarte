import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComentarioComponent } from './delete-comentario.component';

describe('DeleteComentarioComponent', () => {
  let component: DeleteComentarioComponent;
  let fixture: ComponentFixture<DeleteComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
