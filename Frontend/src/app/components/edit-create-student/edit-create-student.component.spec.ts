import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateStudentComponent } from './edit-create-student.component';

describe('EditCreateStudentComponent', () => {
  let component: EditCreateStudentComponent;
  let fixture: ComponentFixture<EditCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
