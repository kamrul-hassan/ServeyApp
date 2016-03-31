using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SurveyApp.Entity
{
    public class GcmUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string RegistrationId { get; set; }
        public string Email { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}