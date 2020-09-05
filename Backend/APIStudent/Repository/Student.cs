using APIStudent.Database;
using APIStudent.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIStudent.Repository
{
    public class Student : IStudent
    {

        private readonly StudentDbContext _context;

        public Student(StudentDbContext context)
        {
            _context = context;   
        }

        public async Task<StudentModel> Add(StudentModel student)
        {
            await _context.Student.AddAsync(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<StudentModel> Delete(int studentiD)
        {
            var entity = await _context.Student.FindAsync(studentiD);

            if (entity == null)
                return entity;

            _context.Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        public async Task<IEnumerable<StudentModel>> GetAll()
        {
            return await _context.Student.ToListAsync();
        }

        public async Task<StudentModel> GetById(int studentId)
        {
            return await _context.Student.Where(s => s.Id == studentId).FirstOrDefaultAsync();
        }

        public async Task<StudentModel> Update(StudentModel student)
        {
            if (!_context.Student.Any(s => s.Id == student.Id))
                return null;

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return student;
        }
    }
}
