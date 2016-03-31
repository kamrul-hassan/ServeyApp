using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class GcmUserModel
    {
        public int Id { get; set; }
        public string RegistrationId { get; set; }
        public string Email { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}