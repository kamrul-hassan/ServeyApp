using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }
    }
}