using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class SurveyAnswer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }        
        public int QuestionId { get; set; }
        public string QuestionOptionIds { get; set; }        
        public string Answer { get; set; }
        public bool IsActive { get; set; }
        public virtual Question Question { get; set; }
    }
}