using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class QuestionModel
    {
        public string Type { get; set; } 
        public string Question { get; set; }
        public int QuestionId { get; set; }
        public dynamic SelectedOption { get; set; }
        public List<KeyValueModel> Options { get; set; } 
    }
}