using SurveyApp.Models;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SurveyApp.Controllers
{
    [EnableCors(origins: "http://10.99.48.157:8100", headers: "*", methods: "*")]
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
