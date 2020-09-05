import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Client } from '../api/student';
import { GetInitialData,
        StudentActionTypes,
        LoadAllStudents, 
        ActionError,
        GetById,
        LoadStudent,
        AddingStudent, 
        UpdatingStudent,
        DeletingStudent} from '../actions/student.actions';

@Injectable()
export class StudentEffects {

  @Effect()
  loadAllStudents$ = this.actions$
    .pipe(
      ofType<GetInitialData>(StudentActionTypes.GetInitialData),
      mergeMap((action) => this.studentService.getAll()
      .pipe(
        map(allStudents => {
          return (new LoadAllStudents({students: allStudents}));
        }),
        catchError((errorMessage) => of(new ActionError({error: errorMessage})))
      ))
  );

  @Effect()
  loadStudent$ = this.actions$
    .pipe(
      ofType<GetById>(StudentActionTypes.GetById),
      mergeMap((action) => this.studentService.get(action.payload.selectedStudentId)
      .pipe(
        map(st => {
          return (new LoadStudent({ student: st }));
        }),
        catchError((errorMessage) => of(new ActionError({error: errorMessage})))
      ))
  );

  @Effect()
  AddingStudent$ = this.actions$
    .pipe(
      ofType<AddingStudent>(StudentActionTypes.AddingStudent),
      mergeMap((action) => this.studentService.add(action.payload.student)
      .pipe(
            map(st => new GetInitialData()
        ),
        catchError((errorMessage) => of(new ActionError({error: errorMessage})))
      ))
  );

  @Effect()
  UpdattingStudent$ = this.actions$
    .pipe(
      ofType<UpdatingStudent>(StudentActionTypes.UpdatingStudent),
      mergeMap((action) => this.studentService.put(action.payload.selectedStudentId, action.payload.student)
      .pipe(
            map(st => new GetInitialData()
        ),
        catchError((errorMessage) => of(new ActionError({error: errorMessage})))
      ))
  );

  @Effect()
  Deletingtudent$ = this.actions$
    .pipe(
      ofType<DeletingStudent>(StudentActionTypes.DeletingStudent),
      mergeMap((action) => this.studentService.delete(action.payload.selectedStudentId)
      .pipe(
        map(st => {
          return (new GetInitialData());
        }),
        catchError((errorMessage) => of(new ActionError({error: errorMessage})))
      ))
  );


  constructor(private actions$: Actions, private store: Store<AppState>, private studentService: Client) { }

}