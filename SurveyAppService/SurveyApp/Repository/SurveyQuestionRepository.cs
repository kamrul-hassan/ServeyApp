using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SurveyApp.Models;
using SurveyApp.Entity;

namespace SurveyApp.Repository
{
    public class SurveyQuestionRepository : ISurveyQuestionRepository
    {
        private AppDbContext _dbContext;
        public List<QuestionModel> GetQuestions()
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.Questions.Where(x=>x.IsActive == true).Select(x => new QuestionModel()
                {
                    QuestionId = x.Id,
                    Question = x.Name,
                    Type = x.Type,
                    IsRequired = x.IsRequired,
                    Options = x.QuestionOptions.Where(q=>q.IsActive == true).Select(q=> new KeyValueModel() { Key = q.Id, Value = q.Option}).ToList()
                }).ToList();
            }
        }
    }
}