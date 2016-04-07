﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Entity
{
    public class QuestionAnswer
    {
        public int Id { get; set; }

        public int QuestionId { get; set; }   
        public int QuestionOptionId { get; set; }
        public virtual Question Question { get; set; }
        public virtual QuestionOption QuestionOption { get; set; }
    }
}