import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSeguidoresComponent } from './ver-seguidores.component';

describe('VerSeguidoresComponent', () => {
  let component: VerSeguidoresComponent;
  let fixture: ComponentFixture<VerSeguidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSeguidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSeguidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
