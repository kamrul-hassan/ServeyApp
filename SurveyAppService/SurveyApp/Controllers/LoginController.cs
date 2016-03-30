using SurveyApp.Models;
using System.Web.Http;

namespace SurveyApp.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        public LoginModel Index(LoginModel model)
        {
            if (!string.IsNullOrEmpty(model.Username) && model.Username == "ims" && !string.IsNullOrEmpty(model.Password) && model.Password == "123")
            {
                return new LoginModel { Username = model.Username, RoleName = "admin" };
            }
            return null;
        }
    }
}
