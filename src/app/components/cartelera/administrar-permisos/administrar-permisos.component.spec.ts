import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarPermisosComponent } from './administrar-permisos.component';

describe('AdministrarPermisosComponent', () => {
  let component: AdministrarPermisosComponent;
  let fixture: ComponentFixture<AdministrarPermisosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarPermisosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
