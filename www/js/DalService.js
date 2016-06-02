angular.module('starter.DalServices', [])

  .factory('DAL', function($cordovaSQLite){

    var services={
      prepareDB: function(){
        try {
          if(window.cordova) {
            db = $cordovaSQLite.openDB({name:"serveyDB.db",location:'default'});
          }
          else {
            db = openDatabase("serveyDB.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
          }

          db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Questions (TypeId integer, UserId integer, Question text)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Servey (ServeyId INTEGER PRIMARY KEY AUTOINCREMENT, TypeId integer, UserId integer, Servey text)");
          });

        } catch (error) {
          alert(error);
        }
      },
      saveServey: function(typeId, userId, res){

            var query = "INSERT INTO Servey (TypeId, UserId, Servey) VALUES (?,?,?)";
            return  $cordovaSQLite.execute(db, query, [typeId, userId, JSON.stringify(res.data)])
              .then(function(res){
                return res.insertId;
            })

      },
      deleteServey: function(Id){


        var question=0;
        var query = "delete from Servey Where ServeyId=?";
        return $cordovaSQLite.execute(db, query, [Id])
          .then(function(res) {
              return question;
            }
          );

      },
      saveQuestion: function(typeId, userId,res){
        try {

          db.transaction(function (tx) {
            var query = "INSERT INTO Questions (TypeId, UserId, Question) VALUES (?,?,?)";
            $cordovaSQLite.execute(db, query, [typeId, userId,JSON.stringify(res.data)])
          });

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
        var query = "Select * from Servey Where ServeyId=?";

        return $cordovaSQLite.execute(db, query, [id])
          .then(function(res) {

              if (res.rows.length > 0) {
                question = res.rows.item(0).Servey;
              }
              return question;
            }
          );
      },
      getServeyList: function(){
        var ServeyList=[];

        return $cordovaSQLite.execute(db, 'Select * from Servey')
          .then(function(res) {

              if (res.rows.length > 0) {
                for(var i = 0; i < res.rows.length; i++) {
                  ServeyList.push(res.rows.item(i).Servey);
                }
              }
              return ServeyList;
            }
          );
      }
    }
    return services;
  })


