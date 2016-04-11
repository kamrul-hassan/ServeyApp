using SurveyApp.Helper;
using SurveyApp.Models;
using SurveyApp.Repository;
using System.Web.Http;

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
            new LogWriter("Email: " + model.Email + " Password: " + model.Password);
            if (!string.IsNullOrEmpty(model.Email) && !string.IsNullOrEmpty(model.Password))
            {
                return _userRepository.GetUser(model.Email, model.Password);                
            }
            return null;
        }
    }
}
