using SurveyApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyApp.Repository
{
    public interface ISurveyQuestionRepository
    {
        List<QuestionModel> GetQuestions();
    }
}
