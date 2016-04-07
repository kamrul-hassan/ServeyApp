using SurveyApp.Entity;
using SurveyApp.Models;
using System.Collections.Generic;

namespace SurveyApp.Repository
{
    public interface IGcmUserRepository
    {
        GcmUserModel Save(User user);
        List<GcmUserModel> GetGcmUsers();
    }
}
