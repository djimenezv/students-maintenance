import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { StudentModel } from '../api/student';

export enum StudentActionTypes {
  DeletingStudent = '[Student] Deleting an existing student',
  UpdatingStudent = '[Student] Updating an existing student',
  AddingStudent = '[Student] Adding a new student',
  GetInitialData = '[Student] Get initial app data',
  LoadStudents = '[Student] Load Students',
  StudentsError = '[Student] General Error',
  GetById = '[Student] Get Student by Id',
  LoadStudent = '[Student] Load Single Student',
}

export class StudentAction implements Action {
  type: string;
  payload: {
    students: StudentModel[],
    student: StudentModel,
    selectedStudentId: number,
    error: string
  };
}

export class GetInitialData implements Action {
  readonly type = StudentActionTypes.GetInitialData;
}

export class DeletingStudent implements Action {
  readonly type = StudentActionTypes.DeletingStudent;
  constructor(readonly payload: {selectedStudentId: number}) { 
  }
}

export class UpdatingStudent implements Action {
  readonly type = StudentActionTypes.UpdatingStudent;
  constructor(readonly payload: {student: StudentModel, selectedStudentId: number}) { 
  }
}

export class AddingStudent implements Action {
  readonly type = StudentActionTypes.AddingStudent;
  constructor(readonly payload: {student: StudentModel}) { 
  }
}

export class GetById implements Action {
  readonly type = StudentActionTypes.GetById;
  constructor(readonly payload: {selectedStudentId: number}) { 
  }
}

export class LoadAllStudents implements Action {
  readonly type = StudentActionTypes.LoadStudents;
  constructor(readonly payload: {students: StudentModel[]}) { 
  }
}

export class LoadStudent implements Action {
  readonly type = StudentActionTypes.LoadStudent;
  constructor(readonly payload: {student: StudentModel}) { 
  }
}

export class ActionError implements Action {
  readonly type = StudentActionTypes.StudentsError;
  constructor(readonly payload: {error: string}) {
  }
}

