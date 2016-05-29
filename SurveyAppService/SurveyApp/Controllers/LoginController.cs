using SurveyApp.Models;
using SurveyApp.Repository;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;

namespace SurveyApp.Controllers
{
    public class LoginController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public LoginController()
        {
            _userRepository = new UserRepository();
        }

        [HttpPost]
        public UserModel Index(UserModel model)
        {            
            if (!string.IsNullOrEmpty(model.Email) && !string.IsNullOrEmpty(model.Password))
            {
                return _users.FirstOrDefault(x => x.Email == model.Email && x.Password == model.Password);
                //return new UserModel(){ Email = model.Email, Id = 1};
                //return _userRepository.GetUser(model.Email, model.Password);                
            }
            return null;
        }
        public static readonly List<UserModel> _users = new List<UserModel>()
        {
            new UserModel() { Email = "Kamrul.Hassan@bd.imshealth.com", Id = 1, Password ="123"},
                new UserModel() { Email = "ims", Id = 2, Password ="123"},
                new UserModel() { Email = "arnab", Id = 3, Password ="123"}
        };
       
    }
}
