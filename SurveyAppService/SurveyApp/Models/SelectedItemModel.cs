using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class SelectedItemModel
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string QuestionOptionIds { get; set; }        
        public int UserId { get; set; }
        public string Answer { get; set; }
    }
}