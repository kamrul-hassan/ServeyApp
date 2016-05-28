using SurveyApp.Models;
using SurveyApp.Repository;
using System.Collections.Generic;
using System.Web.Http;
using System;
using SurveyApp.Entity;

namespace SurveyApp.Controllers
{
    
    public class SurveyAppController : ApiController
    {
        private readonly IUserRepository _gcmUserRepository;

        public SurveyAppController() {
            _gcmUserRepository = new UserRepository();
        }
        [HttpGet]
        public IEnumerable<QuestionModel> Get()
        {
            var model = new List<QuestionModel>
                {
                    new QuestionModel()
                        {
                            Type = "radio",
                            QuestionId = 1,
                            Question = "Please select your department",
                            Options = new List<KeyValueModel>()
                                {
                                    new KeyValueModel() {Key = 1, Value = "Application Development Team"},
                                    new KeyValueModel() {Key = 2, Value = "Database Team"},
                                    new KeyValueModel() {Key = 3, Value = "Service Team"},
                                    new KeyValueModel() {Key = 4, Value = "Admin"},
                                    new KeyValueModel() {Key = 5, Value = "Human Resource"}
                                }

                        },
                    new QuestionModel()
                        {
                            Type = "radio",
                            Question = "I receive the training I need to do my job well.",
                            QuestionId = 2,
                            Options = new List<KeyValueModel>()
                                {
                                    new KeyValueModel() {Key = 1, Value = "Strongly disagree"},
                                    new KeyValueModel() {Key = 2, Value = "disagree"},
                                    new KeyValueModel() {Key = 3, Value = "Neither agree nor disagree"},
                                    new KeyValueModel() {Key = 4, Value = "Strongly Disagree"},
                                    new KeyValueModel() {Key = 5, Value = "Agree"},
                                    new KeyValueModel() {Key = 6, Value = "Strongly agree"}
                                }

                        },
                    new QuestionModel()
                        {
                            Type = "checkbox",
                            QuestionId = 3,
                            Question = "Please select your skills",
                            Options = new List<KeyValueModel>()
                                {
                                    new KeyValueModel() {Key = 1, Value = "ASP.NET"},
                                    new KeyValueModel() {Key = 2, Value = "ASP.NET MVC"},
                                    new KeyValueModel() {Key = 3, Value = "Excel"},
                                    new KeyValueModel() {Key = 4, Value = "Oracle"},
                                    new KeyValueModel() {Key = 5, Value = "SharePoint"},
                                    new KeyValueModel() {Key = 6, Value = "SqlServer"},
                                    new KeyValueModel() {Key = 7, Value = "UI Design"}
                                }

                        },
                    new QuestionModel()
                        {
                            Type = "text",
                            QuestionId = 4,
                            Question = "What I like best about working for the company is:"
                        }
                };
            return model;
        }

        [HttpPost]
        public bool Save(List<QuestionModel> model)
        {
            return true;
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
        public List<SurveyState> GetSurveyList()
        {
            return new List<SurveyState>()
            {
                new SurveyState() {Id = 1, Status = "Completed", Location = "Server", IsSynchronized = true},
                new SurveyState() {Id = 2, Status = "Completed", Location = "Server", IsSynchronized = true},
                new SurveyState() {Id = 3, Status = "Completed", Location = "Local", IsSynchronized = false},
                new SurveyState() {Id = 4, Status = "Completed", Location = "Server", IsSynchronized = true},
                new SurveyState() {Id = 5, Status = "Completed", Location = "Local", IsSynchronized = false},
                new SurveyState() {Id = 6, Status = "Completed", Location = "Server", IsSynchronized = true}

            };
        }
    }
}
