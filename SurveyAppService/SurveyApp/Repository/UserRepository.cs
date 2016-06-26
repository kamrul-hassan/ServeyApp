using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SurveyApp.Entity;
using SurveyApp.Models;

namespace SurveyApp.Repository
{
    public class UserRepository : IUserRepository
    {
        private AppDbContext _dbContext;
        public List<UserModel> GetUsers()
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.Users.Select(x => new UserModel() { Id = x.Id, RegistrationId = x.RegistrationId, Email = x.Email, CreatedOn = x.CreatedOn }).ToList();
            }
        }

        public UserModel GetUser(string email, string password)
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.Users.Where(x=>x.Email.ToLower() == email.ToLower() && x.Password == password).Select(x=> new UserModel() { Id = x.Id, RegistrationId = x.RegistrationId, Email = x.Email, CreatedOn = x.CreatedOn }).FirstOrDefault();
            }
        }

        public UserModel Save(User user)
        {
            using (_dbContext = new AppDbContext())
            {
                _dbContext.Users.Add(user);
                _dbContext.SaveChanges();
            }

            return new UserModel() {
                Id = user.Id,
                RegistrationId = user.RegistrationId,
                Email = user.Email,
                CreatedOn = user.CreatedOn
            };
        }
    }
}