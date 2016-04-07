using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class QuestionOption
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Option { get; set; }
        public virtual Question Question { get; set; }

    }
}