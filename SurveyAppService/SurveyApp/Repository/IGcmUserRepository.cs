using SurveyApp.Entity;
using SurveyApp.Models;
using System.Collections.Generic;

namespace SurveyApp.Repository
{
    public interface IGcmUserRepository
    {
        GcmUserModel Save(GcmUser user);
        List<GcmUserModel> GetGcmUsers();
    }
}
