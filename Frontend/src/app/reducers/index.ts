import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { StudentModel } from '../api/student';
import { StudentActionTypes, StudentAction } from '../actions/student.actions';


export interface studentState  {
  students : StudentModel[] | null,
  processing : boolean,
  selectedStudent : StudentModel | null,
  error: string
}

export interface AppState {
  student : studentState
}

const initialState: studentState = {
  students : [],
  processing : false,
  selectedStudent : null,
  error: null
};

// reducers definition
export const studentReducers = (state: studentState = initialState, action: StudentAction): studentState => {
  switch (action.type) {
    case StudentActionTypes.AddingStudent:
    case StudentActionTypes.UpdatingStudent:
    case StudentActionTypes.GetById:
    case StudentActionTypes.GetInitialData:
    case StudentActionTypes.DeletingStudent:
      return {
        ...state,
        processing: true
      }; 
    case StudentActionTypes.StudentsError:
      return {
        ...state,
        error: action.payload.error,
        processing: false
      }; 
    case StudentActionTypes.LoadStudents:
      return {
        ...state,
        students: action.payload.students,
        processing: false
      };
    case StudentActionTypes.LoadStudent:
        return {
          ...state,
          selectedStudent: action.payload.student,
          processing: false
      }; 
    default:
      return state;
  }};

  // selectors
  export const selectStudents = (state: AppState) => state.student.students;
  export const selectSelectedStudent = (state: AppState) => state.student.selectedStudent;


  // reducers
  export const reducers: ActionReducerMap<AppState> = {
    student: studentReducers 
  };


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
