﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CineTec.Models;

namespace CineTec.DataAccess
{
    public class PostgreSqlContext : DbContext
    {
        public PostgreSqlContext(DbContextOptions<PostgreSqlContext> options) : base(options)
        {
        }

        public DbSet<Client> client { get; set; }

        public DbSet<Employee> employee { get; set; }
        public DbSet<Branch> branch { get; set; }
        public DbSet<Movie> movie { get; set; }
        public DbSet<Room> room { get; set; }
        public DbSet<Seat> seat { get; set; }

        //public DbSet<Bill> Bills { get; set; }
        public DbSet<Projection> projection { get; set; }
        //public DbSet<Classification> Classifications { get; set; }
        //public DbSet<Classification> Actors { get; set; }
  
  

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
