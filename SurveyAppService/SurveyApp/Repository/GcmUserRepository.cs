using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SurveyApp.Entity;
using SurveyApp.Models;

namespace SurveyApp.Repository
{
    public class GcmUserRepository : IGcmUserRepository
    {
        private AppDbContext _dbContext;
        public List<GcmUserModel> GetGcmUsers()
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.GcmUsers.Select(x => new GcmUserModel() { Id = x.Id, RegistrationId = x.RegistrationId, Email = x.Email, CreatedOn = x.CreatedOn }).ToList();
            }
        }

        public GcmUserModel Save(User user)
        {
            using (_dbContext = new AppDbContext())
            {
                _dbContext.GcmUsers.Add(user);
                _dbContext.SaveChanges();
            }

            return new GcmUserModel() {
                Id = user.Id,
                RegistrationId = user.RegistrationId,
                Email = user.Email,
                CreatedOn = user.CreatedOn
            };
        }
    }
}