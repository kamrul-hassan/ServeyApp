using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class Question
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; } 
        public bool IsRequired { get; set; }       
        public bool IsActive { get; set; }
        public virtual ICollection<QuestionOption> QuestionOptions { get; set; }

    }
}