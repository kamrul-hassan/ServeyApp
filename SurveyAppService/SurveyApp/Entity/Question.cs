using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class Question
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } 
        public bool IsRequired { get; set; }       
        public virtual ICollection<QuestionOption> QuestionOptions { get; set; }

    }
}