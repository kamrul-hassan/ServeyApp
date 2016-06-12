angular.module('starter.DalServices', [])

  .factory('DAL', function($cordovaSQLite){

    var services={
      prepareDB: function(){
        try {
          if(ionic.Platform.isAndroid()) {
            db = $cordovaSQLite.openDB({name:"serveyDB.db",location:'default'});
          }
          else if(ionic.Platform.isIOS()) {
            db = $cordovaSQLite.openDB({name:"serveyDB.db",iosDatabaseLocation:'default'});
          }
          else {
            db = openDatabase("serveyDB.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
        }

        db.transaction(function (tx) {
          tx.executeSql("CREATE TABLE IF NOT EXISTS Questions (TypeId integer, UserId integer, Question text)");
          tx.executeSql("CREATE TABLE IF NOT EXISTS Survey (Id INTEGER PRIMARY KEY AUTOINCREMENT,TypeId integer, TypeName text, UserId integer, IsComplete integer,Servey text)");
        });

        } catch (error) {
          alert(error);
        }
      },
      saveServey: function(typeId, typeName,userId, isComplete,res){

            var query = "INSERT INTO Survey (TypeId, TypeName, UserId, IsComplete,Servey) VALUES (?,?,?,?,?)";
            return  $cordovaSQLite.execute(db, query, [typeId, typeName, userId, isComplete, JSON.stringify(res)])
              .then(function(res){
                return res.insertId;
            })

      },
      updateSurvey: function (id, typeId, typeName,userId, isComplete, data) {        
        db.transaction(function (tx) {
          var executeQuery = "UPDATE Survey SET TypeId=?, TypeName=?, UserId=?, IsComplete=?, Servey=? WHERE rowid=?";
          tx.executeSql(executeQuery, [typeId, typeName, userId, isComplete, data, id],
            //On Success
            function (tx, result) { alert('Updated successfully'); },
            //On Error
            function (error) { alert('Something went Wrong'); });
        });
      },
      completeSurvey: function (id) {       
        db.transaction(function (tx) {
          var executeQuery = "UPDATE Survey SET IsComplete=? WHERE rowid=?";
          tx.executeSql(executeQuery, [1, id],
            //On Success
            function (tx, result) { alert('Updated successfully'); },
            //On Error
            function (error) { alert('Something went Wrong'); });
        });
      },
      deleteServey: function(Id){


        var question=0;
        var query = "delete from Survey Where ServeyId=?";
        return $cordovaSQLite.execute(db, query, [Id])
          .then(function(res) {
              return question;
            }
          );

      },
      saveQuestion: function(typeId, userId,res){
        try {
            var query = "INSERT INTO Questions (TypeId, UserId, Question) VALUES (?,?,?)";
            return $cordovaSQLite.execute(db, query, [typeId, userId,JSON.stringify(res.data)])

        } catch (error) {
          alert(error);
        }
      },
      getQuestion: function(typeId, userId){
        var query = "Select * from Questions where TypeId=? and UserId=?";
        return $cordovaSQLite.execute(db, query, [typeId, userId])
          .then(function(res) {

              if (res.rows.length > 0) {
                return res.rows.item(0).Question;
              }
              return null;
            },
            function (err) {
              console.error(err);
              return null;
            });
      },
      getServeyById: function(id){
        var question=null;
        var query = "Select * from Survey Where Id=?";
        return $cordovaSQLite.execute(db, query, [id])
          .then(function(res) {
              if (res.rows.length > 0) {
                question = res.rows.item(0).Servey;
              }
              return question;
            }
          );
      },      
      getSurveyList: function(typeId, userId){
        var ServeyList=[];
        var query = "Select * from Survey Where TypeId=? AND UserId=?";
        return $cordovaSQLite.execute(db, query, [typeId, userId])
          .then(function(res) {
              if (res.rows.length > 0) {                
                for(var i = 0; i < res.rows.length; i++) {
                  var survey = { };
                  survey.Id = res.rows.item(i).Id;
                  survey.IsSynchronized = false;
                  survey.Name = res.rows.item(i).TypeName;
                  survey.Location = "Local";
                  survey.Status = res.rows.item(i).IsComplete == 1? "Completed" : "Inprogress";                  
                  ServeyList.push(survey);
                }
              }
              return ServeyList;
            }
          );
      }
    }
    return services;
  })


