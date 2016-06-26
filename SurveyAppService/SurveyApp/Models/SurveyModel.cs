using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SurveyApp.Models
{
    public class SurveyModel
    {
        public List<SelectedItemModel> SelectedItems { get; set; }
        public int UserId { get; set; }
        public int TypeId { get; set; }
    }
}