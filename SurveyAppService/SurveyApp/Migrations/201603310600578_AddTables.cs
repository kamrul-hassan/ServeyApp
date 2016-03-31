namespace SurveyApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GcmUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegistrationId = c.String(),
                        Email = c.String(),
                        CreatedOn = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.GcmUsers");
        }
    }
}
