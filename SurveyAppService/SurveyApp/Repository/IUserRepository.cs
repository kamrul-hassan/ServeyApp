using SurveyApp.Entity;
using SurveyApp.Models;
using System.Collections.Generic;

namespace SurveyApp.Repository
{
    public interface IUserRepository
    {
        UserModel Save(User user);
        UserModel GetUser(string email, string password);
        List<UserModel> GetUsers();
    }
}
