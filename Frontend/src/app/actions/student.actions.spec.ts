import * as fromStudent from './student.actions';

describe('loadStudents', () => {
  it('should return an action', () => {
    expect(fromStudent.loadStudents().type).toBe('[Student] Load Students');
  });
});
