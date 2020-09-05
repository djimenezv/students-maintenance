import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StudentModel } from 'src/app/api/student';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UpdatingStudent, AddingStudent } from 'src/app/actions/student.actions';


@Component({
  selector: 'app-edit-create-student',
  templateUrl: './edit-create-student.component.html',
  styleUrls: ['./edit-create-student.component.scss']
})
export class EditCreateStudentComponent implements OnInit {

  title: string;
  action: string;
  studentEntity: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: StudentModel, private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.title =  'New Student';
    this.action = 'Save';
    this.configureForm();
    this.configureFormEdit();

  }

  configureFormEdit () : void {

    if (!this.data) 
      return;

    this.title = 'Edit Student';
    this.action = 'Update';
    this.setFormData();  
  }

  onSubmit() : void {
    const student : StudentModel = this.studentEntity.value;

    if(student.id) {
      this.updateStudent(student);
    } else {
      this.addStudent(student);
    }
    
  }

  updateStudent (student : StudentModel) : void {

    this.store.dispatch(new UpdatingStudent({selectedStudentId: student.id, student: student}));

  }

  addStudent (newStudent : StudentModel) : void {
    newStudent.id = newStudent.id ? newStudent.id : 0;
    this.store.dispatch(new AddingStudent( { student: newStudent }));

  }

  configureForm() : void {

    this.studentEntity = new FormGroup({
      id: new FormControl(),
      userName: new FormControl('',[Validators.required]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      age: new FormControl(),
      career: new FormControl('')
    });

  }

  setFormData() : void {

    this.studentEntity.controls['id'].setValue(this.data.id);
    this.studentEntity.controls['userName'].setValue(this.data.username);
    this.studentEntity.controls['firstName'].setValue(this.data.firstName);
    this.studentEntity.controls['lastName'].setValue(this.data.lastName);
    this.studentEntity.controls['age'].setValue(this.data.age);
    this.studentEntity.controls['career'].setValue(this.data.career);

  }

}
