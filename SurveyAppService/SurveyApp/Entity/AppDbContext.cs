using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class AppDbContext : DbContext
    {
        public AppDbContext() : base("CONTENT") {
        }

        public DbSet<GcmUser> GcmUsers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}