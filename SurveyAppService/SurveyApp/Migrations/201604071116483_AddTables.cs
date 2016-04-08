namespace SurveyApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.QuestionAnswers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        QuestionId = c.Int(nullable: false),
                        QuestionOptionId = c.Int(),
                        Answer = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.QuestionId, cascadeDelete: true)
                .ForeignKey("dbo.QuestionOptions", t => t.QuestionOptionId)
                .Index(t => t.QuestionId)
                .Index(t => t.QuestionOptionId);
            
            CreateTable(
                "dbo.Questions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Type = c.String(),
                        IsRequired = c.Boolean(nullable: false),
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
                        Question_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Questions", t => t.Question_Id)
                .Index(t => t.Question_Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RegistrationId = c.String(),
                        Email = c.String(),
                        Password = c.String(),
                        CreatedOn = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.QuestionAnswers", "QuestionOptionId", "dbo.QuestionOptions");
            DropForeignKey("dbo.QuestionAnswers", "QuestionId", "dbo.Questions");
            DropForeignKey("dbo.QuestionOptions", "Question_Id", "dbo.Questions");
            DropIndex("dbo.QuestionOptions", new[] { "Question_Id" });
            DropIndex("dbo.QuestionAnswers", new[] { "QuestionOptionId" });
            DropIndex("dbo.QuestionAnswers", new[] { "QuestionId" });
            DropTable("dbo.Users");
            DropTable("dbo.QuestionOptions");
            DropTable("dbo.Questions");
            DropTable("dbo.QuestionAnswers");
        }
    }
}
