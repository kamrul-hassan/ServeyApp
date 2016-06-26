using SurveyApp.Models;
using SurveyApp.Repository;
using System.Collections.Generic;
using System.Web.Http;
using System;
using SurveyApp.Entity;
using SurveyApp.Services;
using System.Linq;
namespace SurveyApp.Controllers
{
    
    public class SurveyAppController : ApiController
    {
        private readonly IUserRepository _gcmUserRepository;
        private readonly ISurveyQuestionRepository _surveyQuestionRepository;

        public SurveyAppController() {
            _gcmUserRepository = new UserRepository();
            _surveyQuestionRepository = new SurveyQuestionRepository();
        }
        [HttpGet]
        public IEnumerable<QuestionModel> Get(int typeId)
        {
            //return QuestionsService.QuestionSets.Where(x => x.TypeId == typeId).ToList();
            return _surveyQuestionRepository.GetQuestions(typeId);
        }

        [HttpPost]
        public bool Save(List<SurveyModel> model)
        {
            return _surveyQuestionRepository.SaveSurvey(model);
        }

        [HttpPost]
        public UserModel Subscribe(UserModel user)
        {
            return _gcmUserRepository.Save(new User() { CreatedOn = DateTime.Now, Email = user.Email, RegistrationId = user.RegistrationId});
        }

        [HttpPost]
        public bool register(string deviceToken)
        {
            LogWriter.LogWrite("Device Token: " + deviceToken);
            return true;
        }
        [HttpGet]
        public List<SurveyState> GetSurveyList(int userId, int typeId)
        {
            return _surveyQuestionRepository.GetSurveys(userId, typeId);
            //return new List<SurveyState>()
            //{
            //    new SurveyState() {Id = 1, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true},
            //    new SurveyState() {Id = 2, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true},
            //    new SurveyState() {Id = 3, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true},
            //    new SurveyState() {Id = 4, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true},
            //    new SurveyState() {Id = 5, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true},
            //    new SurveyState() {Id = 6, Status = "Completed", Name= "Survey Name 1", Location = "Server", IsSynchronized = true}

            //};
        }

        [HttpGet]
        public List<SurveyTypeModel> GetSurveyTypes()
        {
            return _surveyQuestionRepository.GetSurveyTypes();
            //return new List<SurveyTypeModel>()
            //{
            //    new SurveyTypeModel() {Id = 1, Name = "Survey Name 1", Limit = 100 },
            //    new SurveyTypeModel() {Id = 2, Name = "Survey Name 2", Limit = 80},
            //    new SurveyTypeModel() {Id = 3, Name = "Survey Name 3", Limit = 100 }

            //};
        }
    }
}
