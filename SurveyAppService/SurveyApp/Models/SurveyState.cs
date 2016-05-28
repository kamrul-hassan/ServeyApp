using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class SurveyState
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public bool IsSynchronized { get; set; }
    }
}