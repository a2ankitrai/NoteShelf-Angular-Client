import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesCollectionComponent } from './notes-collection.component';

describe('NotesCollectionComponent', () => {
  let component: NotesCollectionComponent;
  let fixture: ComponentFixture<NotesCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
