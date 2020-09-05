using APIStudent.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIStudent.Repository
{
    public interface IStudent
    {
        Task<StudentModel> Add(StudentModel student);

        Task<StudentModel> Delete(int studentId);

        Task<StudentModel> Update(StudentModel student);

        Task<StudentModel> GetById(int studentId);

        Task<IEnumerable<StudentModel>> GetAll();

    }
}
