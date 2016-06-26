using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class SurveyTypeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Limit { get; set; }
        public bool IsActive { get; set; }
    }
}