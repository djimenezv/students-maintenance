using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIStudent.Model;
using APIStudent.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace APIStudent.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        readonly ILogger<StudentController> _logger;
        readonly IStudent _student;

        public StudentController(ILogger<StudentController> logger, IStudent student)
        {
            _logger = logger;
            _student = student;
        }

        // GET: api/Students
        [HttpGet("get")]
        public async Task<ActionResult<IEnumerable<StudentModel>>> GetAll()
        {
            var students = await _student.GetAll();
            return Ok(students);
        }

        // GET: api/Students/5
        [HttpGet("get/{id}")]
        public async Task<ActionResult<StudentModel>> Get(int id)
        {
            var student = await _student.GetById(id);
            return responseByEntityResult(student);
        }


        // POST: api/Students
        [HttpPost("add")]
        public async Task<ActionResult<StudentModel>> PostStudent(StudentModel student)
        {
            var createdStudent = await _student.Add(student);
            return Ok(createdStudent);
        }

        // PUT: api/Students/5
        [HttpPut("put/{id}")]
        public async Task<ActionResult<StudentModel>> PutStudent(int id, StudentModel student)
        {
            if (student.Id == 0 || string.IsNullOrEmpty(student.Username) || id != student.Id)
                return BadRequest();

            var updatedResult = await _student.Update(student);
            return responseByEntityResult(updatedResult);
        }

        // DELETE: api/Students/5
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<StudentModel>> DeleteStudent(int id)
        { 
            var deleted = await _student.Delete(id);
            return responseByEntityResult(deleted);
        }

        /// <summary>
        /// Response helper method
        /// </summary>
        /// <param name="entityResult">entity result after action</param>
        /// <returns>Not found if entity result isnull 200 code if the entity result is different than null</returns>
        private ActionResult<StudentModel> responseByEntityResult(StudentModel entityResult)
        {
            if (entityResult == null)
                return NotFound();
            else
                return Ok(entityResult);
        }

    }
}
