import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreadosComponent } from './posts-creados.component';

describe('PostsCreadosComponent', () => {
  let component: PostsCreadosComponent;
  let fixture: ComponentFixture<PostsCreadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsCreadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCreadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
