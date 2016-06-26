namespace SurveyApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.QuestionMappings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestionId = c.Int(nullable: false),
                        QuestionOptionId = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.QuestionOptions", t => t.QuestionOptionId, cascadeDelete: true)
                .Index(t => t.QuestionId)
                .Index(t => t.QuestionOptionId);
            
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SurveyTypeId = c.Int(nullable: false),
                        Name = c.String(),
                        ControlType = c.String(),
                        IsRequired = c.Boolean(nullable: false),
                        SortOrder = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SurveyTypes", t => t.SurveyTypeId, cascadeDelete: true)
                .Index(t => t.SurveyTypeId);
            
            CreateTable(
                "dbo.SurveyTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Limit = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.QuestionOptions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Option = c.String(),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SurveyAnswers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestionId = c.Int(nullable: false),
                        QuestionOptionIds = c.String(),
                        Answer = c.String(),
                        IsActive = c.Boolean(nullable: false),
                        Survey_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.Surveys", t => t.Survey_Id)
                .Index(t => t.QuestionId)
                .Index(t => t.Survey_Id);
            
            CreateTable(
                "dbo.Surveys",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        SurveyTypeId = c.Int(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SurveyTypes", t => t.SurveyTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.SurveyTypeId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegistrationId = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        CreatedOn = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Surveys", "UserId", "dbo.Users");
            DropForeignKey("dbo.Surveys", "SurveyTypeId", "dbo.SurveyTypes");
            DropForeignKey("dbo.SurveyAnswers", "Survey_Id", "dbo.Surveys");
            DropForeignKey("dbo.SurveyAnswers", "QuestionId", "dbo.Questions");
            DropForeignKey("dbo.QuestionMappings", "QuestionOptionId", "dbo.QuestionOptions");
            DropForeignKey("dbo.QuestionMappings", "QuestionId", "dbo.Questions");
            DropForeignKey("dbo.Questions", "SurveyTypeId", "dbo.SurveyTypes");
            DropIndex("dbo.Surveys", new[] { "SurveyTypeId" });
            DropIndex("dbo.Surveys", new[] { "UserId" });
            DropIndex("dbo.SurveyAnswers", new[] { "Survey_Id" });
            DropIndex("dbo.SurveyAnswers", new[] { "QuestionId" });
            DropIndex("dbo.Questions", new[] { "SurveyTypeId" });
            DropIndex("dbo.QuestionMappings", new[] { "QuestionOptionId" });
            DropIndex("dbo.QuestionMappings", new[] { "QuestionId" });
            DropTable("dbo.Users");
            DropTable("dbo.Surveys");
            DropTable("dbo.SurveyAnswers");
            DropTable("dbo.QuestionOptions");
            DropTable("dbo.SurveyTypes");
            DropTable("dbo.Questions");
            DropTable("dbo.QuestionMappings");
        }
    }
}
