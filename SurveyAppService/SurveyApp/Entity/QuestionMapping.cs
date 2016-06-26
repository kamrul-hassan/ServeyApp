using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class QuestionMapping
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }        
        public int QuestionId { get; set; } 
        public int QuestionOptionId { get; set; }
        public bool IsActive { get; set; }
        public virtual Question Question { get; set; } 
        public virtual QuestionOption QuestionOption { get; set; }        
    }
}