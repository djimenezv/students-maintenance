import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Observable } from 'rxjs';
import { StudentModel } from 'src/app/api/student';
import { selectStudents } from '../../reducers';
import {MatDialog} from '@angular/material/dialog';
import {GetInitialData, DeletingStudent } from '../../actions/student.actions';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { EditCreateStudentComponent } from '../edit-create-student/edit-create-student.component';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {

  displayedColumns: string[] = ['edit', 'delete', 'id', 'username', 'firstName', 'lastName', 'age', 'career'];
  students$ : Observable<StudentModel[]>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.students$ = this.store.pipe(select(selectStudents));
    this.store.dispatch(new GetInitialData());

  }

  /** this method opens a dialog to edit student */
  openEditDialog(student: StudentModel) : void {
    this.dialog.open(EditCreateStudentComponent, { data : student });
  }

  /** this method opens a confirmation dialog to add student */
  openAddDialog() : void {
    this.dialog.open(EditCreateStudentComponent); 
  }

  /** this method opens a confirmation dialog to reconfirm student deletion */
  openDeleteDialog(student: StudentModel) : void {

    this.dialog.open(ConfirmationComponent, { data : student })
                .afterClosed()
                .subscribe(delStudent => { 
                      if(delStudent) {
                        this.deleteStudent(student.id)
                      }
                });

  }

  /** this method executes the deletion action */
  deleteStudent(studentId: number) {

    this.store.dispatch(new DeletingStudent({ selectedStudentId: studentId}));
  
  }

}
