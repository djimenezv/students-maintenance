using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using APIStudent.Model;
using Microsoft.EntityFrameworkCore;

namespace APIStudent.Database
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) { }

        public DbSet<StudentModel> Student { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite("Data Source=D:\\workingfolder\\tests\\Orbit\\sample.db3");

    }
}
