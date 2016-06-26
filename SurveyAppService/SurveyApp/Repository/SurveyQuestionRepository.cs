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
        public List<QuestionModel> GetQuestions(int typeId)
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.QuestionMappings.GroupBy(n => new { n.Question })
                .Select(g => new QuestionModel()
                {
                    QuestionId = g.Key.Question.Id,
                    Question = g.Key.Question.Name,
                    Type = g.Key.Question.ControlType,
                    IsRequired = g.Key.Question.IsRequired,
                    TypeId = typeId,
                    Options = g.Where(o => o.QuestionOption.IsActive == true).Select(x => new KeyValueModel() { Key = x.QuestionOptionId, Value = x.QuestionOption.Option }).ToList()
                }).ToList();
            }
        }

        public List<SurveyTypeModel> GetSurveyTypes()
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.SurveyTypes.Where(x => x.IsActive == true).Select(x => new SurveyTypeModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Limit = x.Limit,
                    IsActive = x.IsActive                    
                }).ToList();
            }
        }

        public bool SaveSurvey(List<SurveyModel> surveys)
        {
            using (_dbContext = new AppDbContext())
            {
                if (surveys != null && surveys.Any())
                {
                    foreach (var item in surveys)
                    {
                        var list = new List<SurveyAnswer>();
                        foreach (var selectedItem in item.SelectedItems)
                        {
                            list.Add(new SurveyAnswer() { Answer = selectedItem.Answer, QuestionId = selectedItem.QuestionId, QuestionOptionIds = selectedItem.QuestionOptionIds, IsActive = true });
                        }
                        var survey = new Survey
                        {
                            IsActive = true,
                            SurveyTypeId = item.TypeId,
                            UserId = item.UserId,
                            SurveyAnswers = list                            
                        };
                        _dbContext.Surveys.Add(survey);
                        _dbContext.SaveChanges();
                        
                    }                    
                    return true;                        
                }
            }
            return false;

        }


        public List<SurveyState> GetSurveys(int userId, int typeId)
        {
            using (_dbContext = new AppDbContext())
            {
                return _dbContext.Surveys.Where(x => x.IsActive == true && x.UserId == userId && x.SurveyTypeId == typeId).Select(x => new SurveyState()
                {
                    Id = x.Id,
                    Name = x.SurveyType.Name,
                    IsSynchronized = true,
                    Location = "Server",
                    Status = "Completed"
                }).ToList();
            }
        }
    }
}