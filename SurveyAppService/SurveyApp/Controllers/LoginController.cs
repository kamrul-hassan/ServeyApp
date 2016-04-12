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
            if (!string.IsNullOrEmpty(model.Email) && !string.IsNullOrEmpty(model.Password))
            {
                return new UserModel(){ Email = model.Email, Id = 1};
                //return _userRepository.GetUser(model.Email, model.Password);                
            }
            return null;
        }
    }
}
